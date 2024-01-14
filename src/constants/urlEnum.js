const api = 'http://localhost:5000/api';
const urlEnum = {
    api,
    register: `${api}/users/create`,
    login: `${api}/auth/login`,
    userInfo: `${api}/auth/userInfo`,
    refresh: `${api}/auth/refresh`
};

export default urlEnum;
