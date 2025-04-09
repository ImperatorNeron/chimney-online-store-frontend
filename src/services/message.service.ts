class MessageService {
    parsePydanticErrors(errors: any) {
        if (!errors?.detail || !Array.isArray(errors.detail)) {
            return [];
        }

        return errors.detail
            .filter((error: any) => Array.isArray(error.loc) && error.loc.length > 1)
            .map((error: any) => ({
                field: error.loc[1],
                errorType: error.type,
            }));
    };

    async createMessage(message: Message) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });

            if (response.ok) {
                return true;
            }

            if (response.status === 422) {
                return this.parsePydanticErrors(await response.json());
            }

            if (response.status === 500) {
                throw new Error('Internal Server Error');
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }

        } catch (error) {
            console.error('Failed to create message:', error);
            throw new Error('An unexpected error occurred. Please try again later.');
        }
    };
}

export const messageService = new MessageService();