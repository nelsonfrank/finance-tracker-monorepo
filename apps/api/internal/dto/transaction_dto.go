package dto

import "time"

type CreateTransactionDTO struct {
	Amount      float64   `json:"amount" validate:"required"`
	AccountID   int64     `json:"account_id" validate:"required"`
	CategoryID  int64     `json:"category_id" validate:"required"`
	Date        time.Time `json:"date" validate:"required"`
	Description string    `json:"description"`
	Type        string    `json:"type" validate:"required,oneof=income expense transfer"`
}

type UpdateTransactionDTO struct {
	Amount      float64   `json:"amount" validate:"required"`
	AccountID   int64     `json:"account_id" validate:"required"`
	CategoryID  int64     `json:"category_id" validate:"required"`
	Date        time.Time `json:"date" validate:"required"`
	Description string    `json:"description"`
	Type        string    `json:"type" validate:"required,oneof=income expense transfer"`
}
