package services

import (
	"github.com/nelsonfrank/backend-api-go/internal/auth"
	"github.com/nelsonfrank/backend-api-go/internal/repository"
)

type Services struct {
	User     *UserService
	Auth     *AuthService
	Account  *AccountService
	Category *CategoryService
}

func NewServices(repos *repository.Repositories, jwtAuth auth.AuthService) *Services {
	return &Services{
		Auth:     NewAuthService(repos.User, jwtAuth),
		User:     NewUserService(repos.User),
		Account:  NewAccountService(repos.Account),
		Category: NewCategoryService(repos.Category),
	}
}
