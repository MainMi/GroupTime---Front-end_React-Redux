import { REACT_APP_API_URL as api } from '../config/config';
const urlEnum = {
    api,
    register: `${api}/users/create`,
    login: `${api}/auth/login`,
    userInfo: `${api}/auth/userInfo`,
    refresh: `${api}/auth/refresh`
};

export default urlEnum;
