export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// Validate phone number format (e.g., 10 digits)
// const validatePhone = (phone: string) => {
//     const phoneRegex = /^[0-9]{10}$/;
//     return phoneRegex.test(phone);
// };

export const validatePhone = (phone: string) => {
    // Remove all non-numeric characters from the input
    const cleanedPhone = phone.replace(/\D/g, '');

    // Check if the cleaned phone number is exactly 10 digits long
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(cleanedPhone);
};