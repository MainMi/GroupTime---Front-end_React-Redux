import { authAction } from '../slices/auth-slice';
import urlEnum from '../../constants/urlEnum';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getFetch = (parameters, navigate, helpFn) => {
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
                throw new Error(data.message);
            }
            if (helpFn) {
                helpFn(data, navigate, dispatch);
            }
        } catch (e) {
            console.log(e);
            return e;
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
                        navigate('/sign');
                        return;
                    }
                    responseFn(data, dispatch);
                }
            }));
        } catch (e) {
            console.log(e);
            navigate('/sign');
        }
};

export const fetchRegister = (body, navigate) => {
    return async (dispatch) => {
        const parameters = {
            url: urlEnum.register,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
        };

        return getFetch(parameters, navigate, async (data) => {
            const { user, access_token, refresh_token } = data;
            dispatch(authAction.updateAuth({
                userInfo: { ...user, password: undefined },
                userToken: access_token
            }));

            cookies.set('Access', access_token);
            cookies.set('Refresh', refresh_token);

            navigate('/profile');
        })(dispatch);
    }
}

export const fetchLogin = (body, navigate) => {
    return async (dispatch) => {
        const parameters = {
            url: urlEnum.login,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
        };

        console.log(urlEnum.login);

        return getFetch(parameters, navigate, async (data) => {
            const { user, access_token, refresh_token } = data;
            dispatch(authAction.updateAuth({
                userInfo: { ...user, password: undefined },
                userToken: access_token
            }));

            cookies.set('Access', access_token);
            cookies.set('Refresh', refresh_token);

            navigate('/profile');
        })(dispatch);
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
