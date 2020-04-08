// +build !windows

package cmd

import (
	"fmt"
	"os"
	"os/signal"
	"path/filepath"
	"runtime/pprof"
	"strings"
	"syscall"
	"time"

	"github.com/pydio/cells/common/config"
	"github.com/pydio/cells/common/registry"

	"github.com/micro/go-micro/broker"
	"go.uber.org/zap"

	"github.com/pydio/cells/common/log"
)

func handleSignals() {
	c := make(chan os.Signal, 1)

	// SIGUSR1 does not compile on windows. Use direct value syscall.Signal instead
	signal.Notify(c, syscall.SIGINT, syscall.SIGHUP, syscall.SIGUSR1, syscall.SIGTERM)

	go func() {
		for sig := range c {
			switch sig {
			case syscall.SIGINT:

				log.Info("Disconnecting broker")
				// Disconnecting the broker so that we are not flooded with messages
				broker.Disconnect()

				log.Info("Stopping all services")
				// Stop all services
				for _, service := range allServices {
					if service.RequiresFork() && !IsFork {
						// Stopping here would kill the command and prevent proper de-registering of service
						// Signal will be passed along and the fork will stop by itself.
						continue
					}
					service.Stop()
				}

				log.Info("Exiting")
				<-time.After(2 * time.Second)
				os.Exit(0)

			case syscall.SIGUSR1:

				if !profiling {

					serviceMeta := registry.BuildServiceMeta()
					startTags := strings.ReplaceAll(serviceMeta["start"], ",", "-")
					startTags = strings.ReplaceAll(startTags, ":", "-")
					if startTags == "" {
						startTags = "main-process"
					}
					targetDir := filepath.Join(config.ApplicationWorkingDir(config.ApplicationDirLogs), "profiles", startTags)
					os.MkdirAll(targetDir, 0755)
					tStamp := fmt.Sprintf("%d", time.Now().Unix())

					pprof.Lookup("goroutine").WriteTo(os.Stdout, 1)

					if routinesFile, err := os.OpenFile(filepath.Join(targetDir, "goroutines-"+tStamp), os.O_WRONLY|os.O_CREATE, 0755); err == nil {
						pprof.Lookup("goroutine").WriteTo(routinesFile, 1)
						routinesFile.Close()
					}

					if fheap, err := os.OpenFile(filepath.Join(targetDir, "heap-profile-"+tStamp), os.O_WRONLY|os.O_CREATE, 0755); err == nil {
						pprof.WriteHeapProfile(fheap)
						fheap.Close()
					}

					if fcpu, err := os.OpenFile(filepath.Join(targetDir, "cpu-profile-"+tStamp), os.O_WRONLY|os.O_CREATE, 0755); err == nil {
						pprof.StartCPUProfile(fcpu)
						profile = fcpu
						profiling = true
					}
					// Close profiling session after 30s if user forgot to send a second call
					go func() {
						<-time.After(20 * time.Second)
						if profiling {
							fmt.Println("Closing CPU Profiling session to avoid growing profile file!")
							pprof.StopCPUProfile()
							if err := profile.Close(); err != nil {
								log.Fatal("Cannot close cpu profile", zap.Error(err))
							}
							profiling = false
						}
					}()

				} else {

					pprof.StopCPUProfile()
					if err := profile.Close(); err != nil {
						log.Fatal("Cannot close cpu profile", zap.Error(err))
					}
					profiling = false
				}

			case syscall.SIGHUP:
				// Stop all services
				for _, service := range allServices {
					if service.Name() == "nats" {
						continue
					}
					service.Stop()
				}

				initServices()

				// Start all services
				for _, service := range allServices {
					if service.Name() == "nats" {
						continue
					}
					service.Start()
				}
			}
		}
	}()
}
