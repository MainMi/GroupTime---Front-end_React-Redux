import { authAction } from '../slices/auth-slice';
import urlEnum from '../../constants/urlEnum';
import Cookies from 'universal-cookie';

import { decryptAES, encryptAES } from '../../helper/crypto';

const cookies = new Cookies();

export const getFetch = (parameters, navigate, helpFn) => {
    return async (dispatch) => {
        try {
            const { url, method = 'GET', headers = {} } = parameters;
            const body = parameters.body ? JSON.stringify(parameters.body) : null;
            const response = await fetch(url, {
                method,
                headers,
                body
            });
            if (!response) {
                throw new Error('Could not fetch data');
            }
            const data = await response.json();
            if (data.status >= 400 && data.status < 600) {
                if (data.status === 401 && data.errorStatus === 4011) {
                    console.log('Please confirm email!');
                    navigate('/sign');
                    return;
                }

                // eslint-disable-next-line no-throw-literal
                throw {
                    status: data.status,
                    errorStatus: data.errorStatus,
                    message: data.message
                };
            }
            if (helpFn) {
                helpFn(data, navigate, dispatch);
            }
        } catch (e) {
            throw e;
        }
    }
}

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

export const reFetchAuth = (responseFn, navigate, responseArgm = {}) => 
    async (dispatch) => {
        try {
            const authToken = cookies.get('Access');
            if (!authToken || !authToken.length) {
                console.log('bad token');
                navigate('/sign');
                return;
            }

            const url = urlEnum.userInfo;
            const { method = 'POST'} = responseArgm;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': authToken
            };
            const body = responseArgm.body ? JSON.stringify(responseArgm.body) : null;

            const parameters = { url, method, headers, body };
            await dispatch(getFetch(parameters, navigate, async (data) => {
                const isUnauthorized = data.errorStatus === 4011 || data.errorStatus === 4012;

                if (isUnauthorized) {
                    const refreshedData = await refreshAuthToken(headers);
                    if (!refreshedData) {
                        dispatch(authAction.logOutAuth());
                        navigate('/sign');
                        return;
                    }
                    const { access_token } = refreshedData.tokenPair;
                    dispatch(authAction.updateAuth({ userToken: access_token }))
                    const newParameters = { url, method, headers: { ...headers, 'Authorization': access_token }, body };
                    await dispatch(getFetch(newParameters, navigate, responseFn));
                } else {
                    if (data.status >= 400 && data.status < 600) {
                        dispatch(authAction.logOutAuth());
                        navigate('/sign');
                        return;
                    }

                    const encryptedData = encryptAES(data, process.env.REACT_APP_SECRET_KEY);
                    sessionStorage.setItem('userInfo', encryptedData);
                    responseFn(data, dispatch);
                }
            }));
        } catch (e) {
            dispatch(authAction.logOutAuth());
            navigate('/sign');
        }
    };

export const fetchAuth = (responseFn, navigate, responseArgm = {}) =>
    async (dispatch) => {
        const encryptedUserInfo = sessionStorage.getItem('userInfo');
        if (encryptedUserInfo) {
            try {
                const decryptedData = decryptAES(encryptedUserInfo, process.env.REACT_APP_SECRET_KEY);
                responseFn(decryptedData, dispatch);
                navigate('/profile');
                return;
            } catch (e) {
                console.log('User info data corrupted!');
            }
        }

        await reFetchAuth(responseFn, navigate, responseArgm)(dispatch);
    };

export const fetchRegister = (body, navigate) => {
    const parameters = {
        url: urlEnum.register,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    };

    const helpFn = (data, navigate, dispatch) => {
        console.log('Please confirm email!');
        navigate('/sign');
    }

    return async (dispatch) => {
        try {
            await getFetch(parameters, navigate, helpFn)(dispatch);
        } catch (e) {
            console.log(e.message);
        }
    }
}

export const fetchLogin = (body, navigate) => {
    const parameters = {
        url: urlEnum.login,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    };
    console.log(parameters);

    const helpFn = async (data, navigate, dispatch) => {
        const { user, access_token, refresh_token } = data;
        dispatch(authAction.updateAuth({
            userInfo: { ...user, password: undefined },
            userToken: access_token
        }));

        cookies.set('Access', access_token);
        cookies.set('Refresh', refresh_token);

        const encryptedData = encryptAES(user, process.env.REACT_APP_SECRET_KEY);
        sessionStorage.setItem('userInfo', encryptedData);

        navigate('/profile');
    }

    return async (dispatch) => {
        try {
            await getFetch(parameters, navigate, helpFn)(dispatch);
        } catch (e) {
            console.log(e.message);
        }
    }
}

export const fetchUserInfo = (navigate) => {
    const responseFn = (data, dispatch) => {
        dispatch(authAction.updateAuth({
            userInfo: { ...data, password: undefined }
        }))
    }

    return fetchAuth(responseFn, navigate, { url: urlEnum.userInfo });
}
