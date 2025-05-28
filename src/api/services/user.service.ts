import { endpoints } from "../endpoints";
import { http } from "../http";
import { ReadUserDataSchema, UpdateUserSchema } from "../types/types";

class UserService {
    private endpoint = endpoints.users;

    async update(updateUser: UpdateUserSchema, token: string) {
        const url = `${this.endpoint}/me/update`;
        const response = await http.patch<ReadUserDataSchema>(url, updateUser, token);
        return response.data;
    }
}

export const userService = new UserService();