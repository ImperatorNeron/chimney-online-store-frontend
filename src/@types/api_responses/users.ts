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
}

interface PersonalData {
    first_name?: string;
    last_name?: string;
    patronymic?: string;
    email?: string;
    phone_number?: string;
}
