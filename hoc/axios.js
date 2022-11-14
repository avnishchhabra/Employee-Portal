import axios from 'axios';
import { errorNotification } from '../components/notification';
import { eraseCookie, getCookie } from '../utils';
import LS from "../utils/Ls";
// Next we make an 'instance' of it
const instance = axios.create({
    baseURL: "https://pythondemo123.herokuapp.com/v1/"
});

instance.interceptors.request.use(
    (config) => {
        const token = LS.get('token');
        if (token) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token}`;
        }
        // eslint-disable-next-line no-param-reassign
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

function handleSuccess(response) {
    return { data: response.data };
}

function handleError(error) {
    if (error.message === 'Network Error') {
        // The user doesn't have internet
        return Promise.reject(error);
    }
    const { status, data } = error.response;
    switch (status) {
        case 400:
            break;
        case 401:
            break;
        case 404:
            break;
        case 500:
            break;
        case 502:
            break;
        default:
            break;
    }

    if (status === 401 && data.status !== 'Password Not found') {
        eraseCookie('jwt');
        localStorage.removeItem('JWT_TOKEN');
        // localStorage.removeItem('USER');
        localStorage.removeItem('ISGOOGLE');
        window.location.reload();
    }

    const errorMessage = error.response.data.message;
    if (Array.isArray(errorMessage)) {
        errorMessage.map((err) =>
            errorNotification({
                message: 'Error',
                description: err.message[0] || 'Something went wrong',
                duration: 2,
            })
        );
    } else {
        errorNotification({
            message: 'Error',
            description: errorMessage,
            duration: 2,
        });
    }

    return false;
}

instance.interceptors.response.use(handleSuccess, handleError);

export default instance;
