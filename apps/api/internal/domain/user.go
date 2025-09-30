package domain

import "github.com/nelsonfrank/backend-api-go/internal/db"

type User struct {
	ID        int64  `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

type UserRepository interface {
	GetByID(id int64) (User, error)
	Create(firstName, lastName, email, password string) (User, error)
	ListAll(args db.ListUsersParams) ([]User, error)
}
