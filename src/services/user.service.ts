export class UserService {
    static async updateUser(data: PersonalData, token: string) {
        const payload = this.preparePayload(data);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
        return response;
    }

    private static preparePayload(data: PersonalData) {
        return {
            first_name: data.firstName.trim(),
            last_name: data.lastName.trim(),
            patronymic: data.patronymic.trim(),
            email: data.email.trim(),
            phone_number: data.phone.trim(),
        };
    }
}
