package config

import (
	"os"
)

type Config struct {
	DBDSN      string
	ServerPort string
	Env        string
}

func Load() *Config {
	return &Config{
		DBDSN:      os.Getenv("DB_ADDR"),
		ServerPort: os.Getenv("ADDR"),
		Env:        os.Getenv("ENV"),
	}
}
