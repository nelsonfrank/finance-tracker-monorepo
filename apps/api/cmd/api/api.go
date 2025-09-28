package main

import (
	"net/http"
	"time"

	"github.com/nelsonfrank/backend-api-go/internal/config"
	"go.uber.org/zap"
)

type application struct {
	config *config.Config
	logger *zap.SugaredLogger
}

func (app *application) run(mux http.Handler) error {

	srv := http.Server{
		Addr:         app.config.ServerPort,
		Handler:      mux,
		WriteTimeout: time.Second * 30,
		ReadTimeout:  time.Second * 10,
		IdleTimeout:  time.Minute,
	}

	app.logger.Infow("server has started", "addr", app.config.ServerPort, "env", app.config.Env)
	return srv.ListenAndServe()
}
