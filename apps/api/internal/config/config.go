package config

import (
	"os"
)

type Config struct {
	DBDSN       string
	ServerPort  string
	Env         string
	JWTSecret   string
	JWTExpire   string
	JWTAudience string
	JWTIssuer   string
}

func Load() *Config {
	return &Config{
		DBDSN:       os.Getenv("DB_ADDR"),
		ServerPort:  os.Getenv("ADDR"),
		Env:         os.Getenv("ENV"),
		JWTSecret:   os.Getenv("JWT_SECRET"),
		JWTExpire:   os.Getenv("JWT_EXPIRE"),
		JWTAudience: "financial-tracker",
		JWTIssuer:   "financial-tracker",
	}
}
