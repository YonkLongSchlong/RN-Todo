const fetchTodosByDate = async (date, token, id) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const formatDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    const response = await fetch(`${apiUrl}/todo`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
            date: formatDate,
            id: id,
        }),
    });
    const result = await response.json();
    return result;
};

export default fetchTodosByDate;
