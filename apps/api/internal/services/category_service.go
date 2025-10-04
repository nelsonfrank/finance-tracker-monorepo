package services

import (
	"errors"
	"net/http"

	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
	"github.com/nelsonfrank/backend-api-go/internal/dto"
	"github.com/nelsonfrank/backend-api-go/internal/utils"
)

type CategoryService struct {
	repo domain.CategoryRepository
}

func NewCategoryService(repo domain.CategoryRepository) *CategoryService {
	return &CategoryService{repo}
}

func (s *CategoryService) Create(category dto.CreateCategoryDTO, req *http.Request) (domain.Category, error) {
	user, ok := utils.GetUser(req.Context())
	if !ok {
		return domain.Category{}, errors.New("user not found")
	}

	return s.repo.Create(category.Name, category.Type, category.IsDefault, user.ID)
}

func (s *CategoryService) GetByID(id int64) (domain.Category, error) {
	return s.repo.GetByID(id)
}

func (s *CategoryService) List(args db.ListCategoriesParams) ([]domain.Category, error) {
	return s.repo.List(args)
}

func (s *CategoryService) Update(id int64, category dto.UpdateCategoryDTO, req *http.Request) (domain.Category, error) {
	user, ok := utils.GetUser(req.Context())
	if !ok {
		return domain.Category{}, errors.New("user not found")
	}
	return s.repo.Update(id, category.Name, category.Type, category.IsDefault, user.ID)
}

func (s *CategoryService) Delete(id int64) error {
	return s.repo.Delete(id)
}
