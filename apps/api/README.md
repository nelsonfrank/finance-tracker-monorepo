# Go API Template

A minimal Go starter template structured with the **repository design pattern** and powered by modern tools for efficient development.

## Requirements

The following tools/libraries are required to run and work with this template:

* **[sqlc](https://sqlc.dev/)** – Generates type-safe Go code from SQL queries.
* **[golang-migrate](https://github.com/golang-migrate/migrate)** – Handles database migrations.
* **[direnv](https://direnv.net/)** – Automatically loads environment variables from `.envrc`.
* **[docker](https://www.docker.com/)** – Used for running services like PostgreSQL locally.
* **[air](https://github.com/air-verse/air)** – Provides hot-reload for Go during development.
* **[Make](https://www.gnu.org/software/make/)** *(optional)* – Simplifies running commands like migrations and builds.

## Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:nelsonfrank/backend-api-go.git
   ```

2. **Change into project directory**

   ```bash
   cd backend-api-go
   ```

3. **Install dependencies**

   ```sh
   go mod tidy
   ```

4. **Set up environment variables**

   ```sh
   cp .envrc.example .envrc
   # Update .envrc with correct values
   direnv allow
   ```

5. **Start the database server (via Docker)**

   ```sh
   docker compose up -d
   ```

6. **Run database migrations**

   ```sh
   make migrate-up
   ```

7. **Start the server (with hot reload via Air)**

   ```sh
   air
   ```

## Usage Example

Once the server is running (default: `http://localhost:8090`), you can interact with the API.

### Example: Health Check

**Request**

```bash
curl http://localhost:8090/health
```

**Response**

```json
{
  "status": "ok",
  "timestamp": "2025-09-27T12:00:00Z",
  "message": "API is running"
}
```

### Example: Creating a User (if implemented)

**Request**

```bash
curl -X POST http://localhost:8090/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"User","email":"user@example.com","password":"secret123"}'
```

**Response**

```json
{
  "id": 1,
  "name": "User",
  "email": "user@example.com",
  "created_at": "2025-09-27T12:00:00Z"
}
```

## Project Structure (Simplified)

```
backend-api-go/
├── cmd/             # Application entry point
│   └── api          # Main API service
├── internal/        # Core application logic
│   ├── config       # Configuration loading
│   ├── db           # Database connection setup
│   ├── domain       # Domain models/entities
│   ├── dto          # Data transfer objects
│   ├── repository   # Repository layer (DB operations)
│   ├── services     # Business logic
│   ├── transport    # HTTP handlers / routes
│   ├── utils        # Utility functions/helpers
│   └── validator    # Request validation
├── migrations/      # Database migration files
├── queries/         # SQL queries used by sqlc
├── docker-compose.yml
├── go.mod
├── go.sum
├── Makefile
├── sqlc.yaml        # sqlc configuration
└── README.md
```

## Next Steps

* Add your own domain logic and routes in the `internal/` folder.
* Extend database models and queries using `sqlc`.
* Manage schema changes with `golang-migrate`.

## License

This project is licensed under the **MIT License**.
