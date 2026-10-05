function isValidEmail(email: unknown): email is string {
    return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidAge(age: unknown): age is number {
    return typeof age === "number" && Number.isInteger(age) && age >= 0;
}

function isValidPassword(password: unknown): password is string {
    return typeof password === "string" && password.length >= 6 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
}

export const utils = {
    isValidEmail,
    isValidAge,
    isValidPassword
}
