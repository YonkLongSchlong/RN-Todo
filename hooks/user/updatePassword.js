const updatePassword = async ({ id, currentPassword, newPassword, token }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/user/password/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
        }),
    });
    const result = await response.json();
    return result;
};

export default updatePassword;
