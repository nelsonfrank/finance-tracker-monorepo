package domain

import "github.com/nelsonfrank/backend-api-go/internal/db"

type Account struct {
	ID      int64          `json:"id"`
	Name    string         `json:"name"`
	Type    db.AccountType `json:"type"`
	Balance float64        `json:"balance"`
	UserID  int64          `json:"user_id"`
}

type AccountRepository interface {
	Create(name string, amount float64, accountType db.AccountType, userID int64) (Account, error)
	GetByID(id int64) (Account, error)
	List(args db.ListAccountsParams) ([]Account, error)
	Update(id int64, name string, amount float64, accountType db.AccountType) (Account, error)
	Delete(id int64) error
}
