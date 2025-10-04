package main

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/nelsonfrank/backend-api-go/internal/dto"
	v1 "github.com/nelsonfrank/backend-api-go/internal/transport/http/v1"
	v2 "github.com/nelsonfrank/backend-api-go/internal/transport/http/v2"
)

func (app *application) mount() http.Handler {
	r := chi.NewRouter()

	// v1 routes
	r.Route("/api/v1", func(r chi.Router) {
		r.Mount("/auth", v1.NewAuthHandler(app.services.Auth).Routes())
		r.Group(func(r chi.Router) {
			r.Use(app.AuthTokenMiddleware)
			r.Mount("/users", v1.NewUserHandler(app.services.User).Routes())
			r.Mount("/accounts", v1.NewAccountHandler(app.services.Account).Routes())
			r.Mount("/categories", v1.NewCategoryHandler(app.services.Category).Routes())
		})
	})

	// v2 routes
	r.Route("/api/v2", func(r chi.Router) {
		r.Mount("/users", v2.NewUserHandler(app.services.User).Routes())
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
