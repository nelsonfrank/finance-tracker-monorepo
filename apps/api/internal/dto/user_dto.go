package dto

type CreateUserDTO struct {
	Name     string `json:"name" validate:"required,min=3,max=32"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=32"`
}

type UpdateUserDTO struct {
	ID    int64  `json:"id" validate:"required"`
	Name  string `json:"name" validate:"min=3,max=32"`
	Email string `json:"email" validate:"email"`
}

type UserResponseDTO struct {
	ID    int64  `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}
