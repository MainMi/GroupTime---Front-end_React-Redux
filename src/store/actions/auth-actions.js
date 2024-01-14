import { authAction } from '../auth-slice';
import urlEnum from '../../constants/urlEnum';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const fetchAuth = (responseFn, navigate, responseArgm = {}) =>
    async (dispatch) => {
        const authToken = cookies.get('Access');
        const url = urlEnum.userInfo;
        if (!authToken || !authToken.length) {
            navigate('/sign');
            return;
        }

        dispatch(authAction.updateAuth({ userToken: authToken }));

        try {
            let { method = 'POST', body = null } = responseArgm;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': authToken
            };
            if (body) {
                body = JSON.stringify(body)
            }
            const response = await fetch(url, { method, headers, body });
            let responseData = await response.json();
            const isUnauthorized = responseData.errorStatus === 4011 || responseData.errorStatus === 4012;

            if (isUnauthorized) {
                const refreshedData = await refreshAuthToken(headers);
                if (!refreshedData) {
                    dispatch(authAction.logOutAuth());
                    navigate('/sign');
                    return;
                }
                const { access_token } = refreshedData.tokenPair;
                dispatch(authAction.updateAuth({ userToken: access_token }))
                const newResponse = await fetch(url, {
                    method,
                    headers: { 
                        ...headers, 'Authorization': access_token
                    },
                    body 
                });
                responseData = await newResponse.json();

            }
            if (responseData.status >= 400 && responseData.status < 600) {
                navigate('/sign');
                return;
            }

            responseFn(responseData, dispatch);
        } catch (e) {
            console.log(e);
            navigate('/sign');
        }
    };

async function refreshAuthToken(headers) {
    const refreshToken = cookies.get('Refresh');
    if (!refreshToken) {
        return null;
    }

    const refreshResponse = await fetch(urlEnum.refresh, {
        method: 'GET',
        headers: { ...headers, 'Authorization': refreshToken }
    });

    if (!refreshResponse) {
        return null;
    }
    const refreshData = await refreshResponse.json();

    if (refreshData.errorStatus) {
        return null;
    }

    const { access_token, refresh_token } = refreshData.tokenPair;
    cookies.set('Access', access_token);
    cookies.set('Refresh', refresh_token);

    return refreshData;
}

export const fetchRegister = (body, navigate) => {
    return async (dispatch) => {
        try {
            body = JSON.stringify(body);
            const response = await fetch(urlEnum.register, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            });

            if (!response) {
                throw new Error('Could not fetch data');
            }

            const data = await response.json();
            if (data.status >= 400 && data.status < 600) {
                throw new Error(data.message);
            }

            navigate('/profile');
        } catch (e) {
            return e;
        }
    }
}

export const fetchLogin = (body, navigate) => {
    return async (dispatch) => {
        try {
            body = JSON.stringify(body);
            const response = await fetch(urlEnum.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            });
            console.log(body);

            if (!response) {
                throw new Error('Could not fetch data');
            }

            const data = await response.json();
            if (data.status >= 400 && data.status < 600) {
                throw new Error(data.message);
            }

            const { user, access_token, refresh_token } = data;

            dispatch(authAction.updateAuth({
                userInfo: { ...user, password: undefined },
                userToken: access_token
            }));

            cookies.set('Access', access_token);
            cookies.set('Refresh', refresh_token);

            navigate('/profile');
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}

export const fetchUserInfo = () => {
    const responseFn = (data, dispatch) => {
        dispatch(authAction.updateAuth({
            userInfo: { ...data, password: undefined }
        }))
    }

    return fetchAuth(responseFn, { url: urlEnum.userInfo }, false);
}
