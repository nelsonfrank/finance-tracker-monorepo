package dto

import "github.com/nelsonfrank/backend-api-go/internal/db"

type CreateAccountDTO struct {
	Name    string         `json:"name" validate:"required"`
	Type    db.AccountType `json:"type" validate:"required,oneof=bank credit wallet investment"`
	Balance float64        `json:"balance" validate:"required"`
}
