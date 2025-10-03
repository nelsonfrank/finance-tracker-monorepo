
-- name: CreateAccount :one
INSERT INTO accounts (name, type, balance, user_id)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetAccountByID :one
SELECT * FROM accounts
WHERE id = $1
LIMIT 1;

-- name: ListAccounts :many
SELECT * FROM accounts
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: UpdateAccount :one
UPDATE accounts
SET name = $2,
    type = $3,
    balance = $4,
    updated_at = now()
WHERE id = $1
RETURNING *;

-- name: DeleteAccount :exec
DELETE FROM accounts
WHERE id = $1;
