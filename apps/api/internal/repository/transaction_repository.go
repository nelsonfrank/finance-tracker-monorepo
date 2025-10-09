package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
	"github.com/nelsonfrank/backend-api-go/internal/dto"
)

type TransactionRepository struct {
	q *db.Queries
}

func NewTransactionRepository(q *db.Queries) domain.TransactionRepository {
	return &TransactionRepository{q}
}

func (r *TransactionRepository) Create(amount float64, accountID int64, categoryID int64, description string, transactionType string, date time.Time, userID int64) (domain.Transaction, error) {
	i, err := r.q.CreateTransaction(context.Background(), db.CreateTransactionParams{
		Amount:      amount,
		AccountID:   int32(accountID),
		CategoryID:  int32(categoryID),
		Description: sql.NullString{String: description, Valid: true},
		Type:        db.TransactionType(transactionType),
		UserID:      int32(userID),
		Date:        date,
	})
	if err != nil {
		return domain.Transaction{}, err
	}
	return domain.Transaction{
		ID:          int64(i.ID),
		Amount:      amount,
		AccountID:   int64(i.AccountID),
		CategoryID:  int64(categoryID),
		Date:        date,
		Description: description,
		Type:        string(i.Type),
		UserID:      int64(userID),
	}, nil
}

func (r *TransactionRepository) ListTransactions(args db.ListTransactionsParams) ([]domain.Transaction, error) {
	transactions, err := r.q.ListTransactions(context.Background(), args)
	if err != nil {
		return nil, err
	}

	var result []domain.Transaction
	for _, transaction := range transactions {
		result = append(result, domain.Transaction{
			ID:          int64(transaction.ID),
			Amount:      transaction.Amount,
			CategoryID:  int64(transaction.CategoryID),
			Description: transaction.Description.String,
			Type:        string(transaction.Type),
			UserID:      int64(transaction.UserID),
		})
	}
	return result, nil
}

func (r *TransactionRepository) GetTransactionByID(id int64) (domain.Transaction, error) {
	t, err := r.q.GetTransactionByID(context.Background(), int32(id))
	if err != nil {
		fmt.Println(err)
		return domain.Transaction{}, err
	}
	return domain.Transaction{
		ID:          int64(t.ID),
		Amount:      t.Amount,
		AccountID:   int64(t.AccountID),
		CategoryID:  int64(t.CategoryID),
		Date:        t.Date,
		Description: t.Description.String,
		Type:        string(t.Type),
		UserID:      int64(t.UserID),
	}, nil
}

func (r *TransactionRepository) UpdateTransaction(id int64, transaction dto.UpdateTransactionDTO, userID int64) (domain.Transaction, error) {
	t, err := r.q.UpdateTransaction(context.Background(), db.UpdateTransactionParams{
		ID:          int32(id),
		Amount:      transaction.Amount,
		AccountID:   int32(transaction.AccountID),
		CategoryID:  int32(transaction.CategoryID),
		Description: sql.NullString{String: transaction.Description, Valid: true},
		Type:        db.TransactionType(transaction.Type),
		UserID:      int32(userID),
	})
	if err != nil {
		return domain.Transaction{}, err
	}
	return domain.Transaction{
		ID:          int64(t.ID),
		Amount:      t.Amount,
		AccountID:   int64(t.AccountID),
		CategoryID:  int64(t.CategoryID),
		Date:        t.Date,
		Description: t.Description.String,
		Type:        string(t.Type),
		UserID:      int64(t.UserID),
	}, nil
}

func (r *TransactionRepository) DeleteTransaction(id int64) error {

	return r.q.DeleteTransaction(context.Background(), int32(id))
}
