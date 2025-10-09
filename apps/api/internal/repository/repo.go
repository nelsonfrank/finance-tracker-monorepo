package repository

import (
	"database/sql"

	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
)

type Repositories struct {
	User        domain.UserRepository
	Account     domain.AccountRepository
	Category    domain.CategoryRepository
	Transaction domain.TransactionRepository
}

func NewRepositories(conn *sql.DB) *Repositories {
	queries := db.New(conn)

	return &Repositories{
		User:        NewUserRepository(queries),
		Account:     NewAccountRepository(queries),
		Category:    NewCategoryRepository(queries),
		Transaction: NewTransactionRepository(queries),
	}
}
