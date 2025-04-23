export const registrationRequest = async (data: Registration) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Registration failed');
    return res.json();
}


export const loginRequest = async (username: string, password: string): Promise<AuthResponse> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error('Login failed');
    return res.json();
};

export const refreshRequest = async (): Promise<AuthResponse> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Refresh failed');
    return res.json();
};

export const checkAuthRequest = async (): Promise<boolean> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-check`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Refresh-check failed');
    const data = await res.json();
    return data.is_authenticated === true;
};

export const logoutRequest = async (): Promise<void> => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
};
