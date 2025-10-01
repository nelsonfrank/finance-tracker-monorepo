package services

import (
	"github.com/nelsonfrank/backend-api-go/internal/auth"
	"github.com/nelsonfrank/backend-api-go/internal/repository"
)

type Services struct {
	User *UserService
	Auth *AuthService
}

func NewServices(repos *repository.Repositories, jwtAuth auth.AuthService) *Services {
	return &Services{
		User: NewUserService(repos.User),
		Auth: NewAuthService(repos.User, jwtAuth),
	}
}
