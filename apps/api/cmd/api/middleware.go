package main

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/nelsonfrank/backend-api-go/internal/domain"
)

type userContextKey string

const userCtx userContextKey = "user"

func (app *application) AuthTokenMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			return
		}

		token := parts[1]
		jwtToken, err := app.authenticator.ValidateToken(token)
		if err != nil {
			return
		}

		claims, _ := jwtToken.Claims.(jwt.MapClaims)

		userID, err := strconv.ParseInt(fmt.Sprintf("%.f", claims["sub"]), 10, 64)
		if err != nil {
			return
		}

		ctx := r.Context()

		user, err := app.getUser(ctx, userID)
		if err != nil {
			return
		}

		ctx = context.WithValue(ctx, userCtx, user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (app *application) getUser(ctx context.Context, userID int64) (domain.User, error) {
	user, err := app.services.User.GetUserByID(userID)
	if err != nil {
		return domain.User{}, err
	}

	return user, nil
}

func (app *application) RefreshTokenMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Extract token from cookies
		cookie, err := r.Cookie("refresh_token")
		if err != nil {
			if err == http.ErrNoCookie {
				http.Error(w, "Missing refresh token", http.StatusUnauthorized)
			} else {
				http.Error(w, "Error retrieving cookie", http.StatusBadRequest)
			}
			return
		}

		jwtToken, err := app.authenticator.ValidateToken(cookie.Value)
		if err != nil {
			return
		}

		claims, _ := jwtToken.Claims.(jwt.MapClaims)

		userID, err := strconv.ParseInt(fmt.Sprintf("%.f", claims["sub"]), 10, 64)
		if err != nil {
			return
		}

		ctx := r.Context()
		user, err := app.getUser(ctx, userID)
		if err != nil {
			return
		}

		ctx = context.WithValue(ctx, userCtx, user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
