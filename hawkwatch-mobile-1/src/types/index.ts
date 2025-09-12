// This file exports TypeScript types and interfaces used throughout the application.

export interface User {
    id: string;
    email: string;
    created_at: string;
}

export interface AuthResponse {
    user: User;
    session: {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        token_type: string;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignUpCredentials {
    email: string;
    password: string;
}