interface Message {
    user_name: string;
    phone_number: string;
    message?: string;
}

interface BaseMessageSchema {
    user_name: string;
    phone_number: string;
    message?: string;
}

interface CreateMessageSchema extends BaseMessageSchema { }

interface ReadMessageSchema extends BaseMessageSchema {
    id: number;
    created_at?: Date;
}
