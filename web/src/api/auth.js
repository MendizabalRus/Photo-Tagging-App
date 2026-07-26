import request from "./requestFn";

export const user = () => {
    return request("/auth/user");
}

export const register = (body) => {
    return request("/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
    })
}
export const logIn = (body) => {
    return request("/auth/log-in", {
        method: "POST",
        body: JSON.stringify(body),
    })
}