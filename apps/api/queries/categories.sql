
-- name: CreateCategory :one
INSERT INTO categories (user_id, name, type, is_default)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetCategoryByID :one
SELECT * FROM categories
WHERE id = $1
LIMIT 1;

-- name: ListCategories :many
SELECT * FROM categories
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: UpdateCategory :one
UPDATE categories
SET name = $2,
    type = $3,
    is_default = $4,
    user_id = $5
WHERE id = $1
RETURNING *;

-- name: DeleteCategory :exec
DELETE FROM categories
WHERE id = $1;