import COMMON_ERROR_MESSAGES from "./common";

interface PydanticErrorMessages {
    [field: string]: {
        [errorType: string]: string;
    };
}

const PYDANTIC_ERROR_MESSAGES: PydanticErrorMessages = {
    user_name: COMMON_ERROR_MESSAGES["user_name"],
    phone_number: COMMON_ERROR_MESSAGES["phone_number"],
    message: COMMON_ERROR_MESSAGES["message"],
    general: {
        missing: "Це поле є обов'язковим",
        invalid_type: "Невірний тип даних"
    }
};

export default PYDANTIC_ERROR_MESSAGES;