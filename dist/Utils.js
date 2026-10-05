"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
function isValidEmail(email) {
    return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
function isValidAge(age) {
    return typeof age === "number" && Number.isInteger(age) && age >= 0;
}
function isValidPassword(password) {
    return typeof password === "string" && password.length >= 6 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
}
exports.utils = {
    isValidEmail,
    isValidAge,
    isValidPassword
};
