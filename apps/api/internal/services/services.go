package services

import "github.com/nelsonfrank/backend-api-go/internal/repository"

type Services struct {
	User *UserService
}

func NewServices(repos *repository.Repositories) *Services {
	return &Services{
		User: NewUserService(repos.User),
	}
}
