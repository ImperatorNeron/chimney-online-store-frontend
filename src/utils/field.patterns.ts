export const inputPatterns = {
    name: /^[A-Za-zА-Яа-яІіЇїЄє'’`\-\s]+$/,
    username: /^[a-zA-Z0-9_-]+$/,
    phone: /^\d+$/,
    email: /^[a-zA-Z0-9._@-]+$/,
    password: /^[a-zA-Z\d@$!%*?&]*$/,
    latinOnly: /^[A-Za-z\s]+$/,
    cyrillicOnly: /^[А-Яа-яІіЇїЄє\s]+$/,
    address: /^[A-Za-zА-Яа-яІіЇїЄєҐґ0-9\s.,'’`"\-/()]+$/,
    message: /^[A-Za-zА-Яа-яІіЇїЄєҐґ0-9\s.,!?()'"`«»:-]*$/
}
