const createTodo = async ({ title, description, category, token, user }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const todo = {
        user_id: user.id,
        title: title,
        description: description,
        category: category.toUpperCase(),
        is_complete: false,
    };

    const response = await fetch(`${apiUrl}/todo/create`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(todo),
    });
    const result = await response.json();
    return result;
};

export default createTodo;
