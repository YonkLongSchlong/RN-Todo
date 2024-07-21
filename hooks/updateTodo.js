const updateTodo = async ({ id, title, description, category, token }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const todo = {
        title: title,
        description: description,
        category: category.toUpperCase(),
    };

    const response = await fetch(`${apiUrl}/todo/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify(todo),
    });
    const result = await response.json();
    return result;
};

export default updateTodo;
