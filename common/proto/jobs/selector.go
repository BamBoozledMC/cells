/*
 * Copyright (c) 2018. Abstrium SAS <team (at) pydio.com>
 * This file is part of Pydio Cells.
 *
 * Pydio Cells is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio Cells is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio Cells.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

package jobs

import (
	"context"

	"github.com/micro/go-micro/client"
)

var (
	fieldEvaluators []FieldEvaluator
)

type FieldEvaluator interface {
	EvaluateField(ctx context.Context, input ActionMessage, value string) string
}

type InputSelector interface {
	Select(cl client.Client, ctx context.Context, input ActionMessage, objects chan interface{}, done chan bool) error
	MultipleSelection() bool
}

type InputFilter interface {
	Filter(ctx context.Context, input ActionMessage) (ActionMessage, bool)
}

// RegisterFieldEvaluator adds a new evaluator to internal registry
func RegisterFieldEvaluator(evaluator FieldEvaluator) {
	fieldEvaluators = append(fieldEvaluators, evaluator)
}

// GetFieldEvaluators lists all registered evaluators
func GetFieldEvaluators() []FieldEvaluator {
	return fieldEvaluators
}

// EvaluateFieldStr goes through all registered evaluators to modify string value on the fly
func EvaluateFieldStr(ctx context.Context, input ActionMessage, value string) string {
	output := value
	for _, e := range fieldEvaluators {
		output = e.EvaluateField(ctx, input, output)
	}
	return output
}

// EvaluateFieldStr goes through all registered evaluators to modify string value on the fly
func EvaluateFieldStrSlice(ctx context.Context, input ActionMessage, values []string) []string {
	for i, v := range values {
		values[i] = EvaluateFieldStr(ctx, input, v)
	}
	return values
}

