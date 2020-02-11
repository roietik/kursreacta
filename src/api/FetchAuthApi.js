const BASE_URL = "http://localhost:5000"

const FetchAuthApi = {
    login: async function (credentials) {
        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        if (!res.ok) {
            throw new Error("Something went wrong");
        }
        const result = await res.json();       
        return result;
    },
}

export default FetchAuthApi;