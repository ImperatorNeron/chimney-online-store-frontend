import { checkAuthRequest, loginRequest, logoutRequest, refreshRequest } from '@/services/auth.service'
import { create } from 'zustand';


interface AuthResponse {
    access_token: string;
    access_token_expire_seconds: number;
    token_type: string;
}


interface AuthState {
    accessToken: string | null;
    expiresAt: number | null;
    isAuthenticated: boolean;
    isInitialized: boolean;

    login: (username: string, password: string) => Promise<void>;
    refresh: () => Promise<void>;
    isTokenValid: () => boolean;
    checkAuthentication: () => Promise<boolean>;
    initialize: () => Promise<void>;
    getValidToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>((set, get) => {
    const setToken = (data: AuthResponse) => {
        const expiresAt = Date.now() + data.access_token_expire_seconds * 1000;
        set({ accessToken: data.access_token, expiresAt, isAuthenticated: true });
    };

    return {
        accessToken: null,
        expiresAt: null,
        isAuthenticated: false,
        isInitialized: false,

        login: async (username: string, password: string) => {
            try {
                const data = await loginRequest(username, password);
                setToken(data);
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },

        isTokenValid: () => {
            const { expiresAt } = get();
            return !!expiresAt && Date.now() < expiresAt;
        },

        refresh: async () => {
            if (get().isTokenValid()) return;

            try {
                const data = await refreshRequest();
                setToken(data);
            } catch (error) {
                console.error('Refresh error:', error);
                try {
                    await logoutRequest();
                } catch (logoutError) {
                    console.error('Logout error:', logoutError);
                }
                set({ accessToken: null, expiresAt: null, isAuthenticated: false });
                throw error;
            }
        },

        checkAuthentication: async () => {
            try {
                const isAuth = await checkAuthRequest();
                set({ isAuthenticated: isAuth });

                if (isAuth) await get().refresh();
                return isAuth;
            } catch (error) {
                console.error('Check auth error:', error);
                set({ isAuthenticated: false });
                return false;
            }
        },

        getValidToken: async () => {
            const { accessToken, isTokenValid, checkAuthentication } = get();
            let token = accessToken;

            if (token && !isTokenValid()) {
                const ok = await checkAuthentication();
                token = ok ? get().accessToken : null;
            }

            return token;
        },

        initialize: async () => {
            if (get().isInitialized) return;
            await get().checkAuthentication();
            set({ isInitialized: true });
        },
    };
});
