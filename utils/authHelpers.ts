export const validateUser = (email: string, username: string, profilePicture: string, password: string, confirmPassword: string) => {
    let errors = []
    
    // check if user object has all the required properties
    if (username && password && confirmPassword && email && profilePicture) {
        // check if username is less than 3 characters, more than 20 characters, and contains only alphanumeric characters
        if (username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
            errors.push('username must be between 3 and 20 characters and contain only alphanumeric characters')
        }
        // check if password is less than 8 characters
        if (password.length < 8) {
            errors.push('password must be at least 8 characters')
        }
        // check if password and username are the same
        if (password === username) {
            errors.push('password cannot be the same as username')
        }

        // check if password and confirm password are the same
        if (password !== confirmPassword) {
            errors.push('password and confirm password must match')
        }

        // check if email is valid
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('email must be a valid email address')
        }
        // return true if all checks pass
        return errors
    }
    errors.push('all fields are required')
    return errors
}