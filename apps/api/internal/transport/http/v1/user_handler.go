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

type UserHandler struct {
	service *services.UserService
}

func NewUserHandler(s *services.UserService) *UserHandler {
	return &UserHandler{s}
}

func (h *UserHandler) Routes() chi.Router {
	r := chi.NewRouter()
	r.Post("/", h.CreateUser)
	r.Get("/{id}", h.GetUserByID)
	r.Get("/", h.ListUsers)
	return r
}

func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var body dto.CreateUserDTO
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := validator.Validate.Struct(body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	u, err := h.service.RegisterUser(body.Name, body.Email, body.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(u)
}

func (h *UserHandler) GetUserByID(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}

	u, err := h.service.GetUserByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(u)
}

func (h *UserHandler) ListUsers(w http.ResponseWriter, r *http.Request) {
	limit := utils.QueryInt(r, "limit", 10)
	offset := utils.QueryInt(r, "offset", 0)

	args := db.ListUsersParams{
		Limit:  int32(limit),
		Offset: int32(offset),
	}

	u, err := h.service.ListUsers(args)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(u)
}
