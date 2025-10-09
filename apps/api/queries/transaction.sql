-- name: ListTransactions :many
SELECT * FROM transactions
LIMIT $1 OFFSET $2;

-- name: CreateTransaction :one
INSERT INTO transactions ( account_id, category_id, user_id, amount, description, type, date )
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: GetTransactionByID :one
SELECT * FROM transactions
WHERE id = $1
LIMIT 1;

-- name: UpdateTransaction :one
UPDATE transactions
SET amount = $2, account_id = $3, category_id = $4, user_id = $5, description = $6, type = $7, date = $8
WHERE id = $1
RETURNING *;

-- name: DeleteTransaction :exec
DELETE FROM transactions
WHERE id = $1;
