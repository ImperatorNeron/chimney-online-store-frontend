export const inputPatterns = {
    name: /^[A-Za-zА-Яа-яІіЇїЄє'’`\-\s]+$/,
    phone: /^\d+$/,
    email: /^[a-zA-Z0-9._@-]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
    latinOnly: /^[A-Za-z\s]+$/,
    cyrillicOnly: /^[А-Яа-яІіЇїЄє\s]+$/,
    address: /^[A-Za-zА-Яа-яІіЇїЄєҐґ0-9\s.,'’`"\-/()]+$/,
}
