import { authService } from '@/api/services/auth.service';
import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
    expiresAt: number | null;
    isAuthenticated: boolean;
    isInitialized: boolean;

    register: (data: RegisterUserSchema) => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    refresh: () => Promise<void>;
    isTokenValid: () => boolean;
    checkAuthentication: () => Promise<boolean>;
    initialize: () => Promise<void>;
    getValidToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>((set, get) => {
    const setToken = (data: TokenInfoSchema) => {
        const expiresAt = Date.now() + data.access_token_expire_seconds * 1000;
        set({ accessToken: data.access_token, expiresAt, isAuthenticated: true });
    };

    return {
        accessToken: null,
        expiresAt: null,
        isAuthenticated: false,
        isInitialized: false,

        register: async (data: RegisterUserSchema) => {
            await authService.register(data);
            await get().login(data.username, data.password);
        },

        login: async (username: string, password: string) => {
            const data = await authService.login({ username, password });
            setToken(data);
        },

        isTokenValid: () => {
            const { expiresAt } = get();
            return !!expiresAt && Date.now() < expiresAt;
        },

        refresh: async () => {
            if (get().isTokenValid()) return;

            try {
                const data = await authService.refresh();
                setToken(data);
            } catch (error) {
                set({ accessToken: null, expiresAt: null, isAuthenticated: false });

                try {
                    await authService.logout();
                } catch { }
                throw error;
            }
        },

        checkAuthentication: async () => {
            try {
                const isAuth = await authService.checkAuth();
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
