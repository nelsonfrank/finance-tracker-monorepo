package main

import (
	"context"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/nelsonfrank/backend-api-go/internal/config"
	"github.com/nelsonfrank/backend-api-go/internal/db"
	"github.com/nelsonfrank/backend-api-go/internal/repository"
	"github.com/nelsonfrank/backend-api-go/internal/services"
	transport "github.com/nelsonfrank/backend-api-go/internal/transport/http"
	"go.uber.org/zap"
)

func main() {
	// Initialize application
	app := application{
		config: config.Load(),
		logger: zap.Must(zap.NewProduction()).Sugar(),
	}
	defer app.logger.Sync()

	// Initialize database connection
	conn, err := db.Connect(context.Background(), app.config.DBDSN)
	if err != nil {
		app.logger.Fatal(err)
	}
	defer conn.Close()

	// Initialize repositories
	repos := repository.NewRepositories(conn)

	// Initialize services
	services := services.NewServices(repos)

	// Initialize API
	api := transport.NewAPI(services)

	// Run application
	if err := app.run(api.Router()); err != nil {
		app.logger.Fatal(err)
	}
}
