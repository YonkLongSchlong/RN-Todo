const register = async ({ firstName, lastName, email, password }) => {
    const response = await fetch(
        "http://192.168.1.10:8080/api/v1/auth/register",
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            }),
        }
    );
    return response;
};

export default register;
