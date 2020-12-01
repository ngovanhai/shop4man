import axiosClient from './axiosClient';

const userApi = {
    login: (user) => {
        const url = 'api/auth/login';
        return axiosClient.post(url, user);
    },
    refresh_token: (token) => {
        const url = `user/refresh_token`;
        return axiosClient.post(url, token);
    },
    getUser: () => {
        const url = `api/auth/user`;
        return axiosClient.get(url)
    },
    update: (id) => {
        const url = `api/products/${id}`;
        return axiosClient.patch(url);
    },
    logout: () => {
        const url = 'api/auth/logout';
        return axiosClient.get(url)
    },
    deleteImage: (public_id) => {
        const url = 'api/destroy';
        return axiosClient.post(url, public_id)
    }
}

export default userApi;