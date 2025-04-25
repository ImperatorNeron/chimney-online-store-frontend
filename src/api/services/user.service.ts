import { endpoints } from "../endpoints";
import { http } from "../http";

class UserService {
    private endpoint = endpoints.users;

    async update(updateUser: UserUpdateSchema, token: string) {
        const url = `${this.endpoint}/me/update`;
        const response = await http.patch<ApiResponseOne<ReadUserSchema>>(url, updateUser, token);
        return response.data;
    }
}

export const userService = new UserService();