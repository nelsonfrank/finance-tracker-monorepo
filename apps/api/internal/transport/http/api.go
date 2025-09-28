package http

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/nelsonfrank/backend-api-go/internal/dto"
	"github.com/nelsonfrank/backend-api-go/internal/services"
	v1 "github.com/nelsonfrank/backend-api-go/internal/transport/http/v1"
	v2 "github.com/nelsonfrank/backend-api-go/internal/transport/http/v2"
)

// API holds all dependencies needed for routing
type API struct {
	services *services.Services
}

func NewAPI(services *services.Services) *API {
	return &API{services: services}
}

// Router builds and returns the chi router with versioned routes
func (api *API) Router() http.Handler {
	r := chi.NewRouter()

	// v1 routes
	r.Route("/api/v1", func(r chi.Router) {
		r.Mount("/users", v1.NewUserHandler(api.services.User).Routes())
	})

	// v2 routes
	r.Route("/api/v2", func(r chi.Router) {
		r.Mount("/users", v2.NewUserHandler(api.services.User).Routes())
	})

	// health check
	r.Route("/health", func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json")
			resp := dto.HealthResponse{
				Status:    "ok",
				Timestamp: time.Now(),
				Message:   "API is running",
			}
			json.NewEncoder(w).Encode(resp)
		})
	})

	return r
}
