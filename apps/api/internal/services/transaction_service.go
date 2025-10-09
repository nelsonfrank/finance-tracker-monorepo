package services

import (
	"errors"
	"net/http"

	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
	"github.com/nelsonfrank/backend-api-go/internal/dto"
	"github.com/nelsonfrank/backend-api-go/internal/utils"
)

type TransactionService struct {
	repository domain.TransactionRepository
}

func NewTransactionService(repository domain.TransactionRepository) *TransactionService {
	return &TransactionService{repository: repository}
}

func (s *TransactionService) Create(transaction dto.CreateTransactionDTO, r *http.Request) (domain.Transaction, error) {
	user, ok := utils.GetUser(r.Context())
	if !ok {
		return domain.Transaction{}, errors.New("user not found")
	}
	return s.repository.Create(transaction.Amount, transaction.AccountID, transaction.CategoryID, transaction.Description, transaction.Type, transaction.Date, user.ID)
}

func (s *TransactionService) ListTransactions(args db.ListTransactionsParams) ([]domain.Transaction, error) {
	return s.repository.ListTransactions(args)
}

func (s *TransactionService) GetTransactionByID(id int64) (domain.Transaction, error) {
	return s.repository.GetTransactionByID(id)
}

func (s *TransactionService) UpdateTransaction(id int64, transaction dto.UpdateTransactionDTO, r *http.Request) (domain.Transaction, error) {
	user, ok := utils.GetUser(r.Context())
	if !ok {
		return domain.Transaction{}, errors.New("user not found")
	}
	return s.repository.UpdateTransaction(id, transaction, user.ID)
}

func (s *TransactionService) DeleteTransaction(id int64) error {
	return s.repository.DeleteTransaction(id)
}
