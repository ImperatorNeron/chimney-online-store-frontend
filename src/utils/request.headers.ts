import { useAuthStore } from "@/store/auth.store";

export const getAuthHeaders = async (): Promise<HeadersInit> => {
    const { accessToken, isTokenValid, checkAuthentication } = useAuthStore.getState();

    let token = accessToken;
    if (token && !isTokenValid()) {
        const isAuth = await checkAuthentication();
        token = isAuth ? useAuthStore.getState().accessToken : null;
    }

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    return headers;
};
