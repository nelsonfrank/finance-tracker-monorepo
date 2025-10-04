package dto

import "github.com/nelsonfrank/backend-api-go/internal/db"

type CreateCategoryDTO struct {
	Name      string          `json:"name" validate:"required"`
	Type      db.CategoryType `json:"type" validate:"required,oneof=expense income"`
	IsDefault bool            `json:"is_default"`
}

type UpdateCategoryDTO struct {
	Name      string          `json:"name" validate:"required"`
	Type      db.CategoryType `json:"type" validate:"required,oneof=expense income"`
	IsDefault bool            `json:"is_default"`
}
