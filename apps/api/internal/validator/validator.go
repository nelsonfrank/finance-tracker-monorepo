package validator

import "github.com/go-playground/validator/v10"

// This line creates a singleton validator instance
var Validate = validator.New()
