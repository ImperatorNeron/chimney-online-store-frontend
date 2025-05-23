interface User {
    email?: string;
    username: string;
    phone_number?: string;
    first_name?: string;
    last_name?: string;
    patronymic?: string;
    id: number;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
    password?: string;
    confirm_password?: string;
}

interface PersonalData {
    first_name?: string;
    last_name?: string;
    patronymic?: string;
    email?: string;
    phone_number?: string;
}

interface LoginUserSchema {
    username: string;
    password: string;
}

interface BaseUserFields {
    email?: string;
    phone_number?: string;
    first_name?: string;
    last_name?: string;
    patronymic?: string;
}

interface UsernameField {
    username: string;
}

interface PasswordField {
    password: string;
}

interface RegisterUserSchema extends BaseUserFields, UsernameField, PasswordField {
    confirm_password: string;
}

interface UserUpdateSchema extends BaseUserFields { }

interface ReadUserSchema extends BaseUserFields, UsernameField {
    id: number; // PositiveInt
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
}

interface IsAuthenticatedSchema {
    is_authenticated: boolean;
}