package domain

import "github.com/nelsonfrank/backend-api-go/internal/db"

type User struct {
	ID    int64
	Name  string
	Email string
}

type UserRepository interface {
	GetByID(id int64) (User, error)
	Create(name, email, password string) (User, error)
	ListAll(args db.ListUsersParams) ([]User, error)
}
