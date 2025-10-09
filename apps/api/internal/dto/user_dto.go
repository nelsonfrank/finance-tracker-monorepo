package dto

type User struct {
	ID           int64  `json:"id"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	Email        string `json:"email"`
	PasswordHash string `json:"password_hash"`
}

type CreateUserDTO struct {
	FirstName string `json:"first_name" validate:"required,min=3,max=32"`
	LastName  string `json:"last_name" validate:"required,min=3,max=32"`
	Email     string `json:"email" validate:"required,email"`
	Password  string `json:"password" validate:"required,min=8,max=32"`
}

type UpdateUserDTO struct {
	ID        int64  `json:"id" validate:"required"`
	FirstName string `json:"first_name" validate:"min=3,max=32"`
	LastName  string `json:"last_name" validate:"min=3,max=32"`
	Email     string `json:"email" validate:"email"`
}

type UserResponseDTO struct {
	ID    int64  `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}
