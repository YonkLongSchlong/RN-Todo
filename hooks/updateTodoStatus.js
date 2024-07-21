const updateTodoStatus = async ({ id, token }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/todo/status/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
    });
    const result = await response.json();
    return result;
};

export default updateTodoStatus;
