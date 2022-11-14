/* eslint-disable dot-notation */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import moment from 'moment';

export const toFixed = (num) => Number(num).toFixed(2);

export const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const getCookie = (name) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        // eslint-disable-next-line eqeqeq
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        // eslint-disable-next-line eqeqeq
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

export const eraseCookie = (name) => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const orderStatus = (status) => {
    switch (status) {
        case 'fulfilled': {
            return 'green';
        }
        case 'cancelled': {
            return 'red';
        }
        case 'placed': {
            return 'blue';
        }
        default: {
            return 'cyan';
        }
    }
};

export const formatDate = (date, format) =>
    moment(date).format(format);

export const formatArray = (array) => {
    const newArray = [];
    if (array && array.length) {
        array.forEach((objy) => {
            newArray.push({
                key: obj.id || obj,
                label: obj.name || obj.title || obj,
            });
        });
    }
    return newArray;
};

export const generateFilterString = (searchHearders) => {
    let searchString = '';
    for (const [key, value] of Object.entries(searchHearders)) {
        if (searchString && value) {
            searchString += ',';
        }
        if (value) searchString += value && `${key}:${value}`;
    }
    return searchString;
};

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const formatPhone = (contactNumber) => {
    let phone = contactNumber;
    if (!contactNumber.startsWith('+91')) {
        phone = `+91${contactNumber}`;
    }
    return phone;
};

export const isAdmin = () => {
    const user = localStorage.getItem('USER');
    const { roles } = user;
    return roles.includes('admin');
};

export const hasPermission = (permission) => {
    const user = localStorage.getItem('USER');
    const { permissions } = user;
    return permissions.includes(`${permission}`);
};

export const getUserRole = () => {
    const user = localStorage.getItem('USER');
    if (user) {
        const { roles } = JSON.parse(user);
        return roles[0];
    }
    return false;
};

export const snakeToCamel = (str) =>
    str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace('-', '').replace('_', '')
        );

export const setLocalStorage = (name, data) => {
    const response = JSON.stringify(data);
    localStorage.setItem(name, response);
};

export const getlocalStorage = (name) => {
    const response = localStorage.getItem(name);
    return response ? JSON.parse(response) : null;
};

export const removelocalStorage = (name) =>
    localStorage.removeItem(name);




