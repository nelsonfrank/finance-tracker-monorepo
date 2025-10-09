package domain

import (
	"time"

	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/dto"
)

type Transaction struct {
	ID          int64
	Amount      float64
	AccountID   int64
	CategoryID  int64
	Date        time.Time
	CreatedAt   time.Time
	Description string
	Type        string
	UpdatedAt   time.Time
	UserID      int64
}

type TransactionRepository interface {
	Create(amount float64, accountID int64, categoryID int64, description string, transactionType string, date time.Time, userID int64) (Transaction, error)
	ListTransactions(args db.ListTransactionsParams) ([]Transaction, error)
	GetTransactionByID(id int64) (Transaction, error)
	UpdateTransaction(id int64, transaction dto.UpdateTransactionDTO, userID int64) (Transaction, error)
	DeleteTransaction(id int64) error
}
