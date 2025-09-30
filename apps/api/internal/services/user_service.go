package services

import (
	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
)

type UserService struct {
	Repo domain.UserRepository
}

func NewUserService(r domain.UserRepository) *UserService {
	return &UserService{r}
}

func (s *UserService) RegisterUser(firstName, lastName, email, password string) (domain.User, error) {
	return s.Repo.Create(firstName, lastName, email, password)
}

func (s *UserService) GetUserByID(id int64) (domain.User, error) {
	return s.Repo.GetByID(id)
}

func (s *UserService) ListUsers(args db.ListUsersParams) ([]domain.User, error) {
	return s.Repo.ListAll(args)
}
