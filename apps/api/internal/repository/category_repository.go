package repository

import (
	"context"
	"database/sql"

	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
)

type categoryRepository struct {
	q *db.Queries
}

func NewCategoryRepository(q *db.Queries) domain.CategoryRepository {
	return &categoryRepository{q}
}

func (r *categoryRepository) Create(name string, categoryType db.CategoryType, isDefault bool, userID int64) (domain.Category, error) {
	i, err := r.q.CreateCategory(context.Background(), db.CreateCategoryParams{
		Name:      name,
		Type:      categoryType,
		IsDefault: sql.NullBool{Bool: isDefault, Valid: true},
		UserID:    int32(userID),
	})
	if err != nil {
		return domain.Category{}, err
	}
	return domain.Category{ID: int64(i.ID), Name: i.Name, Type: i.Type, IsDefault: i.IsDefault.Bool}, nil
}

func (r *categoryRepository) GetByID(id int64) (domain.Category, error) {
	i, err := r.q.GetCategoryByID(context.Background(), int32(id))
	if err != nil {
		return domain.Category{}, err
	}
	return domain.Category{ID: int64(i.ID), Name: i.Name, Type: i.Type, IsDefault: i.IsDefault.Bool}, nil
}

func (r *categoryRepository) List(args db.ListCategoriesParams) ([]domain.Category, error) {
	i, err := r.q.ListCategories(context.Background(), args)
	if err != nil {
		return nil, err
	}
	var categories []domain.Category
	for _, category := range i {
		categories = append(categories, domain.Category{ID: int64(category.ID), Name: category.Name, Type: category.Type, IsDefault: category.IsDefault.Bool})
	}
	return categories, nil
}

func (r *categoryRepository) Update(id int64, name string, categoryType db.CategoryType, isDefault bool, userID int64) (domain.Category, error) {
	i, err := r.q.UpdateCategory(context.Background(), db.UpdateCategoryParams{
		ID:        int32(id),
		Name:      name,
		Type:      categoryType,
		IsDefault: sql.NullBool{Bool: isDefault, Valid: true},
		UserID:    int32(userID),
	})
	if err != nil {
		return domain.Category{}, err
	}
	return domain.Category{ID: int64(i.ID), Name: i.Name, Type: i.Type, IsDefault: i.IsDefault.Bool}, nil
}

func (r *categoryRepository) Delete(id int64) error {
	return r.q.DeleteCategory(context.Background(), int32(id))
}
