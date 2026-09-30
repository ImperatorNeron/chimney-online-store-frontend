import { endpoints } from "../endpoints";
import { http } from "../http";
import { AReadUserSchema, UserUpdateWithPasswordSchema } from "../types/types";

class UserService {
    private endpoint = endpoints.users;

    async update(updateUser: UserUpdateWithPasswordSchema, token: string) {
        const url = `${this.endpoint}/me/update`;
        const response = await http.patch<AReadUserSchema>(url, updateUser, token);
        return response.data;
    }
}

export const userService = new UserService();