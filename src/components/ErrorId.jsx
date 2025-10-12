export const FormError = (data) => {
    if (!data?.password) return "Password is required"
    if (!data?.email) return "Email is required"
    if (!data?.username) return "Username is required"
    if (!data?.photo) return "Photo is required"
    return null
}