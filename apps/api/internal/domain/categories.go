package domain

import (
	"time"

	"github.com/nelsonfrank/backend-api-go/internal/db"
)

type Category struct {
	ID        int64           `json:"id"`
	Name      string          `json:"name"`
	Type      db.CategoryType `json:"type"`
	IsDefault bool            `json:"is_default"`
	CreatedAt time.Time       `json:"created_at"`
	UpdatedAt time.Time       `json:"updated_at"`
}

type CategoryRepository interface {
	Create(name string, categoryType db.CategoryType, isDefault bool, userID int64) (Category, error)
	GetByID(id int64) (Category, error)
	List(args db.ListCategoriesParams) ([]Category, error)
	Update(id int64, name string, categoryType db.CategoryType, isDefault bool, userID int64) (Category, error)
	Delete(id int64) error
}
