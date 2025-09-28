package utils

import (
	"net/http"
	"strconv"
)

func QueryInt(r *http.Request, key string, def int) int {
	val := r.URL.Query().Get(key)
	if v, err := strconv.Atoi(val); err == nil {
		return v
	}
	return def
}
