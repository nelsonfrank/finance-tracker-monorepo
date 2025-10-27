
  
export interface LoginFormPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  access_token: string,
  refresh_token: string,
  expires_in: string,
}

export interface SignupFormPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface SignupResponse {
  user: User;
}


export interface User {
   id: number,
   first_name: string,
   last_name: string,
   email: string,
}