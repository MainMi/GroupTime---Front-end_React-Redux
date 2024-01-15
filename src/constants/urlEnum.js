const api = process.env.REACT_APP_API_URL;
const urlEnum = {
    api,
    register: `${api}/users/create`,
    login: `${api}/auth/login`,
    userInfo: `${api}/auth/userInfo`,
    refresh: `${api}/auth/refresh`
};

export default urlEnum;
