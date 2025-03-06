interface CommonErrorMessages {
    [field: string]: {
        [errorType: string]: string;
    };
}

const COMMON_ERROR_MESSAGES: CommonErrorMessages = {
    user_name: {
        missing: "Це поле є обов\'язковим",
        string_too_short: "Ім'я повинно містити щонайменше 2 символи",
        string_too_long: "Ім'я не може перевищувати 100 символів",
        value_error: "Дозволені тільки літери, дефіси та апострофи"
    },
    phone_number: {
        missing: "Це поле є обов\'язковим",
        string_too_short: "Номер має містити щонайменше 9 цифр",
        string_too_long: "Номер не може перевищувати 11 цифр",
        value_error: "Дозволені тільки цифри"
    },
    message: {
        string_too_long: "Повідомлення не може перевищувати 1000 символів",
    }
};

export default COMMON_ERROR_MESSAGES;