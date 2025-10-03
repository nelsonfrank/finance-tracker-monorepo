package repository

import (
	"context"
	"database/sql"

	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
)

type accountRepository struct {
	q *db.Queries
}

func NewAccountRepository(q *db.Queries) domain.AccountRepository {
	return &accountRepository{q}
}

func (r *accountRepository) Create(name string, amount float64, accountType db.AccountType, userID int64) (domain.Account, error) {
	i, err := r.q.CreateAccount(context.Background(), db.CreateAccountParams{
		Name:    name,
		Type:    accountType,
		Balance: sql.NullFloat64{Float64: amount, Valid: true},
		UserID:  int32(userID),
	})
	if err != nil {
		return domain.Account{}, err
	}
	return domain.Account{ID: int64(i.ID), Name: i.Name, Type: i.Type, Balance: i.Balance.Float64, UserID: int64(i.UserID)}, nil
}

func (r *accountRepository) GetByID(id int64) (domain.Account, error) {
	i, err := r.q.GetAccountByID(context.Background(), int32(id))
	if err != nil {
		return domain.Account{}, err
	}
	return domain.Account{ID: int64(i.ID), Name: i.Name, Type: i.Type, Balance: i.Balance.Float64, UserID: int64(i.UserID)}, nil
}

func (r *accountRepository) List(args db.ListAccountsParams) ([]domain.Account, error) {
	i, err := r.q.ListAccounts(context.Background(), args)
	if err != nil {
		return nil, err
	}
	var accounts []domain.Account
	for _, account := range i {
		accounts = append(accounts, domain.Account{ID: int64(account.ID), Name: account.Name, Type: account.Type, Balance: account.Balance.Float64, UserID: int64(account.UserID)})
	}
	return accounts, nil
}

func (r *accountRepository) Update(id int64, name string, amount float64, accountType db.AccountType) (domain.Account, error) {
	i, err := r.q.UpdateAccount(context.Background(), db.UpdateAccountParams{
		ID:      int32(id),
		Name:    name,
		Type:    accountType,
		Balance: sql.NullFloat64{Float64: amount, Valid: true},
	})
	if err != nil {
		return domain.Account{}, err
	}
	return domain.Account{ID: int64(i.ID), Name: i.Name, Type: i.Type, Balance: i.Balance.Float64, UserID: int64(i.UserID)}, nil
}

func (r *accountRepository) Delete(id int64) error {
	return r.q.DeleteAccount(context.Background(), int32(id))
}
