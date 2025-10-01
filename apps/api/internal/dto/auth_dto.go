package dto

import (
	"time"

	"github.com/nelsonfrank/backend-api-go/internal/domain"
)

type LoginRequestDTO struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponseDTO struct {
	AccessToken  string        `json:"access_token"`
	RefreshToken string        `json:"refresh_token"`
	ExpiresIn    time.Duration `json:"expires_in"`
	User         domain.User   `json:"user"`
}
