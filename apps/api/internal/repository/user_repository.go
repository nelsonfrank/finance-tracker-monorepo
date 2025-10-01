package repository

import (
	"context"
	"database/sql"

	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
)

type userRepository struct {
	q *db.Queries
}

func NewUserRepository(q *db.Queries) domain.UserRepository {
	return &userRepository{q}
}

func (r *userRepository) GetByID(id int64) (domain.User, error) {
	u, err := r.q.GetUserByID(context.Background(), int32(id))
	if err != nil {
		return domain.User{}, err
	}
	return domain.User{ID: int64(u.ID), FirstName: u.FirstName.String, LastName: u.LastName.String, Email: u.Email}, nil
}

func (r *userRepository) Create(firstName, lastName, email, password string) (domain.User, error) {
	u, err := r.q.CreateUser(context.Background(), db.CreateUserParams{FirstName: sql.NullString{String: firstName, Valid: true}, LastName: sql.NullString{String: lastName, Valid: true}, Email: email, PasswordHash: password})
	if err != nil {
		return domain.User{}, err
	}
	return domain.User{ID: int64(u.ID), FirstName: u.FirstName.String, LastName: u.LastName.String, Email: u.Email}, nil
}

func (r *userRepository) ListAll(arg db.ListUsersParams) ([]domain.User, error) {
	us, err := r.q.ListUsers(context.Background(), arg)
	if err != nil {
		return nil, err
	}

	var users []domain.User
	for _, u := range us {
		users = append(users, domain.User{ID: int64(u.ID), FirstName: u.FirstName.String, LastName: u.LastName.String, Email: u.Email})
	}
	return users, nil
}

func (r *userRepository) GetByEmail(email string) (domain.User, error) {
	u, err := r.q.GetUserByEmail(context.Background(), email)
	if err != nil {
		return domain.User{}, err
	}
	return domain.User{ID: int64(u.ID), FirstName: u.FirstName.String, LastName: u.LastName.String, Email: u.Email, PasswordHash: u.PasswordHash}, nil
}
