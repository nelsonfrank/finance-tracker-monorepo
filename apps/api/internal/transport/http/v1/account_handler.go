package v1

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/dto"
	"github.com/nelsonfrank/backend-api-go/internal/services"
	"github.com/nelsonfrank/backend-api-go/internal/utils"
	"github.com/nelsonfrank/backend-api-go/internal/validator"
)

type AccountHandler struct {
	service *services.AccountService
}

func NewAccountHandler(s *services.AccountService) *AccountHandler {
	return &AccountHandler{s}
}

func (h *AccountHandler) Routes() chi.Router {
	r := chi.NewRouter()
	r.Post("/", h.CreateAccount)
	r.Get("/{id}", h.GetAccountByID)
	r.Get("/", h.ListAccounts)
	r.Put("/{id}", h.UpdateAccount)
	r.Delete("/{id}", h.DeleteAccount)
	return r
}

func (h *AccountHandler) CreateAccount(w http.ResponseWriter, r *http.Request) {
	var account dto.CreateAccountDTO

	if err := json.NewDecoder(r.Body).Decode(&account); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := validator.Validate.Struct(account); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Println(validator.Validate.Struct(account))

	createdAccount, err := h.service.CreateAccount(account, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(createdAccount)
}

func (h *AccountHandler) GetAccountByID(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}

	account, err := h.service.GetAccountByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(account)
}

func (h *AccountHandler) ListAccounts(w http.ResponseWriter, r *http.Request) {
	limit := utils.QueryInt(r, "limit", 10)
	offset := utils.QueryInt(r, "offset", 0)

	args := db.ListAccountsParams{
		Limit:  int32(limit),
		Offset: int32(offset),
	}

	accounts, err := h.service.ListAccounts(args)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(accounts)
}

func (h *AccountHandler) UpdateAccount(w http.ResponseWriter, r *http.Request) {

}

func (h *AccountHandler) DeleteAccount(w http.ResponseWriter, r *http.Request) {

}
