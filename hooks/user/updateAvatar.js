const updateAvatar = async ({ id, formData, token }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/user/avatar/${id}`, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: formData,
    });
    return response;
};

export default updateAvatar;
