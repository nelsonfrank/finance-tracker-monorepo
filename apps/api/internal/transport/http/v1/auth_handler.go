package v1

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/nelsonfrank/backend-api-go/internal/dto"
	"github.com/nelsonfrank/backend-api-go/internal/services"
	"github.com/nelsonfrank/backend-api-go/internal/utils"
	"github.com/nelsonfrank/backend-api-go/internal/validator"
)

type AuthHandler struct {
	service *services.AuthService
}

func NewAuthHandler(s *services.AuthService) *AuthHandler {
	return &AuthHandler{s}
}

func (h *AuthHandler) Routes() chi.Router {
	r := chi.NewRouter()
	r.Post("/login", h.Login)
	r.Post("/signup", h.Signup)
	return r
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var body dto.LoginRequestDTO

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := validator.Validate.Struct(body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	u, err := h.service.Login(body.Email, body.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	utils.WriteJSON(w, http.StatusOK, u)
}

func (h *AuthHandler) Signup(w http.ResponseWriter, r *http.Request) {
	var body dto.SignupRequestDTO

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := validator.Validate.Struct(body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	u, err := h.service.Signup(body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	utils.WriteJSON(w, http.StatusCreated, u)
}
