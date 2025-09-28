package v2

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/nelsonfrank/backend-api-go/internal/services"
)

type UserHandler struct {
	service *services.UserService
}

func NewUserHandler(s *services.UserService) *UserHandler {
	return &UserHandler{s}
}

func (h *UserHandler) Routes() chi.Router {
	r := chi.NewRouter()
	r.Get("/{id}", h.GetUserByID)
	return r
}

func (h *UserHandler) GetUserByID(w http.ResponseWriter, r *http.Request) {
	response := map[string]interface{}{
		"id":      1,
		"name":    "Alice",
		"email":   "alice@example.com",
		"version": "v2",
	}
	json.NewEncoder(w).Encode(response)
}
