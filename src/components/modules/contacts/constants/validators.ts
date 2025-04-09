import COMMON_ERROR_MESSAGES from "./common";

const VALIDATORS = {
    NAME: {
        required: COMMON_ERROR_MESSAGES["user_name"]?.["missing"],
        minLength: {
            value: 2,
            message: COMMON_ERROR_MESSAGES["user_name"]?.["string_too_short"]
        },
        maxLength: {
            value: 50,
            message: COMMON_ERROR_MESSAGES["user_name"]?.["string_too_long"]
        },
        pattern: {
            value: /^[A-Za-zА-Яа-яІіЇїЄє'’`\-\s]+$/,
            message: COMMON_ERROR_MESSAGES["user_name"]?.["value_error"]
        },
    },
    PHONE: {
        required: COMMON_ERROR_MESSAGES["phone_number"]?.["missing"],
        pattern: {
            value: /^[0-9]+$/,
            message: COMMON_ERROR_MESSAGES["phone_number"]?.["value_error"]
        },
        minLength: {
            value: 9,
            message: COMMON_ERROR_MESSAGES["phone_number"]?.["string_too_short"]
        },
        maxLength: {
            value: 11,
            message: COMMON_ERROR_MESSAGES["phone_number"]?.["string_too_long"]
        }
    },
    MESSAGE: {
        maxLength: {
            value: 1000,
            message: COMMON_ERROR_MESSAGES["message"]?.["string_too_long"]
        }
    }
}



export default VALIDATORS;