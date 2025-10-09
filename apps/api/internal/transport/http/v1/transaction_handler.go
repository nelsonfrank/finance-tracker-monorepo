package v1

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/dto"
	"github.com/nelsonfrank/backend-api-go/internal/services"
	"github.com/nelsonfrank/backend-api-go/internal/utils"
	"github.com/nelsonfrank/backend-api-go/internal/validator"
)

type TransactionHandler struct {
	service *services.TransactionService
}

func NewTransactionHandler(service *services.TransactionService) *TransactionHandler {
	return &TransactionHandler{service}
}

func (h *TransactionHandler) Routes() chi.Router {
	r := chi.NewRouter()
	r.Post("/", h.CreateTransaction)
	r.Get("/", h.ListTransactions)
	r.Get("/{id}", h.GetTransaction)
	r.Put("/{id}", h.UpdateTransaction)
	r.Delete("/{id}", h.DeleteTransaction)
	return r
}

func (h *TransactionHandler) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	var transaction dto.CreateTransactionDTO
	if err := json.NewDecoder(r.Body).Decode(&transaction); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := validator.Validate.Struct(transaction); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	newTransaction, err := h.service.Create(transaction, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	utils.WriteJSON(w, http.StatusCreated, newTransaction)
}

func (h *TransactionHandler) ListTransactions(w http.ResponseWriter, r *http.Request) {
	limit := utils.QueryInt(r, "limit", 10)
	offset := utils.QueryInt(r, "offset", 0)

	args := db.ListTransactionsParams{
		Limit:  int32(limit),
		Offset: int32(offset),
	}
	transactions, err := h.service.ListTransactions(args)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	utils.WriteJSON(w, http.StatusOK, transactions)
}

func (h *TransactionHandler) GetTransaction(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}

	transaction, err := h.service.GetTransactionByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	utils.WriteJSON(w, http.StatusOK, transaction)
}

func (h *TransactionHandler) UpdateTransaction(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}
	var transaction dto.UpdateTransactionDTO
	if err := json.NewDecoder(r.Body).Decode(&transaction); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err := validator.Validate.Struct(transaction); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	updatedTransaction, err := h.service.UpdateTransaction(int64(id), transaction, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	utils.WriteJSON(w, http.StatusOK, updatedTransaction)
}

func (h *TransactionHandler) DeleteTransaction(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}
	err = h.service.DeleteTransaction(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	utils.WriteJSON(w, http.StatusOK, nil)
}
