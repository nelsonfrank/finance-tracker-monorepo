package utils

import (
	"context"

	"github.com/nelsonfrank/backend-api-go/internal/domain"
)

type userContextKey string

const userCtx userContextKey = "user"

func WithUser(ctx context.Context, user *domain.User) context.Context {
	return context.WithValue(ctx, userCtx, user)
}

func GetUser(ctx context.Context) (*domain.User, bool) {
	user, ok := ctx.Value(userCtx).(*domain.User)
	return user, ok
}
