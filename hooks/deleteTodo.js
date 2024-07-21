const deleteTodo = async ({ id, token }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/todo/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
    });
    const result = await response.json();
    return result;
};

export default deleteTodo;
