package services

import (
	"errors"

	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	Repo domain.UserRepository
}

func NewUserService(r domain.UserRepository) *UserService {
	return &UserService{r}
}

func (s *UserService) RegisterUser(firstName, lastName, email, password string) (domain.User, error) {
	_, err := s.Repo.GetByEmail(email)
	if err == nil {
		return domain.User{}, errors.New("user already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return domain.User{}, err
	}

	return s.Repo.Create(firstName, lastName, email, string(hashedPassword))
}

func (s *UserService) GetUserByID(id int64) (domain.User, error) {
	return s.Repo.GetByID(id)
}

func (s *UserService) ListUsers(args db.ListUsersParams) ([]domain.User, error) {
	return s.Repo.ListAll(args)
}
