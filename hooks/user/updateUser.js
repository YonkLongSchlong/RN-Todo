const updateUser = async ({
    id,
    firstName,
    lastName,
    email,
    password,
    token,
}) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const user = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
    };

    const response = await fetch(`${apiUrl}/user/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify(user),
    });
    const result = await response.json();
    return result;
};

export default updateUser;
