package errors

import (
	"net/http"

	"github.com/nelsonfrank/backend-api-go/internal/utils"
	"go.uber.org/zap"
)

type Error struct {
	log *zap.SugaredLogger
}

func NewError(log *zap.SugaredLogger) *Error {
	return &Error{log: log}
}

func (e *Error) InternalServerError(w http.ResponseWriter, r *http.Request, err error) {
	e.log.Errorw("internal error", "method", r.Method, "path", r.URL.Path, "error", err.Error())

	utils.WriteJSONError(w, http.StatusInternalServerError, "the server encountered a problem")
}

func (e *Error) ForbiddenResponse(w http.ResponseWriter, r *http.Request) {
	e.log.Warnw("forbidden", "method", r.Method, "path", r.URL.Path, "error")

	utils.WriteJSONError(w, http.StatusForbidden, "forbidden")
}

func (e *Error) BadRequestResponse(w http.ResponseWriter, r *http.Request, err error) {
	e.log.Warnf("bad request", "method", r.Method, "path", r.URL.Path, "error", err.Error())

	utils.WriteJSONError(w, http.StatusBadRequest, err.Error())
}

func (e *Error) ConflictResponse(w http.ResponseWriter, r *http.Request, err error) {
	e.log.Errorf("conflict response", "method", r.Method, "path", r.URL.Path, "error", err.Error())

	utils.WriteJSONError(w, http.StatusConflict, err.Error())
}

func (e *Error) NotFoundResponse(w http.ResponseWriter, r *http.Request, err error) {
	e.log.Warnf("not found error", "method", r.Method, "path", r.URL.Path, "error", err.Error())

	utils.WriteJSONError(w, http.StatusNotFound, "not found")
}

func (e *Error) UnauthorizedErrorResponse(w http.ResponseWriter, r *http.Request, err error) {
	e.log.Warnf("unauthorized error", "method", r.Method, "path", r.URL.Path, "error", err.Error())

	utils.WriteJSONError(w, http.StatusUnauthorized, "unauthorized")
}

func (e *Error) UnauthorizedBasicErrorResponse(w http.ResponseWriter, r *http.Request, err error) {
	e.log.Warnf("unauthorized basic error", "method", r.Method, "path", r.URL.Path, "error", err.Error())

	w.Header().Set("WWW-Authenticate", `Basic realm="restricted", charset="UTF-8"`)

	utils.WriteJSONError(w, http.StatusUnauthorized, "unauthorized")
}

func (e *Error) RateLimitExceededResponse(w http.ResponseWriter, r *http.Request, retryAfter string) {
	e.log.Warnw("rate limit exceeded", "method", r.Method, "path", r.URL.Path)

	w.Header().Set("Retry-After", retryAfter)

	utils.WriteJSONError(w, http.StatusTooManyRequests, "rate limit exceeded, retry after: "+retryAfter)
}
