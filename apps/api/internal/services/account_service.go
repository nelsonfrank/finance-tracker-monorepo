package services

import (
	"errors"
	"net/http"

	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
	"github.com/nelsonfrank/backend-api-go/internal/dto"
	"github.com/nelsonfrank/backend-api-go/internal/utils"
)

type AccountService struct {
	Repo domain.AccountRepository
}

func NewAccountService(r domain.AccountRepository) *AccountService {
	return &AccountService{r}
}

func (s *AccountService) CreateAccount(account dto.CreateAccountDTO, r *http.Request) (domain.Account, error) {
	user, ok := utils.GetUser(r.Context())
	if !ok {
		return domain.Account{}, errors.New("user not found")
	}
	return s.Repo.Create(account.Name, account.Balance, db.AccountType(account.Type), int64(user.ID))
}

func (s *AccountService) GetAccountByID(id int64) (domain.Account, error) {
	return s.Repo.GetByID(id)
}

func (s *AccountService) ListAccounts(args db.ListAccountsParams) ([]domain.Account, error) {
	return s.Repo.List(args)
}

func (s *AccountService) UpdateAccount(id int64, account dto.UpdateAccountDTO) (domain.Account, error) {
	return s.Repo.Update(id, account.Name, account.Balance, db.AccountType(account.Type))
}

func (s *AccountService) DeleteAccount(id int64) error {
	return s.Repo.Delete(id)
}
