package services

import (
	"errors"
	"time"

	"github.com/nelsonfrank/backend-api-go/internal/auth"
	"github.com/nelsonfrank/backend-api-go/internal/config"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
	"github.com/nelsonfrank/backend-api-go/internal/dto"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	Repo domain.UserRepository
	Auth auth.AuthService
}

func NewAuthService(r domain.UserRepository, auth auth.AuthService) *AuthService {
	return &AuthService{r, auth}
}

func (s *AuthService) Login(email, password string) (*dto.LoginResponseDTO, error) {

	cfg := config.Load()

	u, err := s.Repo.GetByEmail(email)
	if err != nil {
		return nil, err
	}
	if u.ID == 0 {
		return nil, errors.New("user not found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password)); err != nil {
		return nil, errors.New("invalid password")
	}

	claims := s.Auth.JwtClaimGenerator(uint(u.ID), time.Duration(time.Minute*120), cfg.JWTIssuer, cfg.JWTAudience)
	accessToken, err := s.Auth.GenerateToken(claims)
	if err != nil {
		return nil, err
	}

	refreshClaims := s.Auth.JwtClaimGenerator(uint(u.ID), time.Duration(time.Minute*30), cfg.JWTIssuer, cfg.JWTAudience)
	refreshToken, err := s.Auth.GenerateToken(refreshClaims)
	if err != nil {
		return nil, err
	}

	return &dto.LoginResponseDTO{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpiresIn:    time.Minute * 120,
		User:         u,
	}, nil
}
