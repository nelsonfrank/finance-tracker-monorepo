package main

import (
	"context"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/nelsonfrank/backend-api-go/internal/auth"
	"github.com/nelsonfrank/backend-api-go/internal/config"
	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/repository"
	"github.com/nelsonfrank/backend-api-go/internal/services"
	"go.uber.org/zap"
)

func main() {
	// Initialize config
	config := config.Load()

	// Initialize logger
	logger := zap.Must(zap.NewProduction()).Sugar()
	defer logger.Sync()

	// Initialize database connection
	conn, err := db.Connect(context.Background(), config.DBDSN)
	if err != nil {
		logger.Fatal(err)
	}
	defer conn.Close()

	// Initialize repositories
	repos := repository.NewRepositories(conn)

	// Initialize JWT authenticator
	jwtAuth := auth.NewJWTAuthenticator(config.JWTSecret, config.JWTAudience, config.JWTIssuer)

	// Initialize services
	services := services.NewServices(repos, jwtAuth)

	app := application{
		config:        config,
		logger:        logger,
		authenticator: jwtAuth,
		db:            conn,
		repositories:  repos,
		services:      services,
	}

	// Run application
	if err := app.run(app.mount()); err != nil {
		logger.Fatal(err)
	}
}
