import { endpoints } from "../endpoints";
import { http } from '@/api/http';
import { RegisterUserSchema, LoginUserSchema, AReadUserSchema, TokenInfoSchema } from "../types/types";

class AuthService {
    private endpoint = endpoints.auth;

    async login(credentials: LoginUserSchema) {
        const url = `${this.endpoint}/login`;
        const response = await http.post<TokenInfoSchema>(url, credentials);
        return response;
    };

    async refresh() {
        const url = `${this.endpoint}/refresh`;
        const response = await http.post<TokenInfoSchema>(url);
        return response;
    }

    async register(createUserData: RegisterUserSchema) {
        const url = `${this.endpoint}/register`;
        const response = await http.post<AReadUserSchema>(url, createUserData);
        return response.data;
    }

    async checkAuth() {
        const url = `${this.endpoint}/refresh-check`;
        const response = await http.get<{ is_authenticated: boolean }>(url);
        return response.is_authenticated;
    }

    async logout() {
        const url = `${this.endpoint}/logout`;
        await http.post<null>(url);
    }
}


export const authService = new AuthService();