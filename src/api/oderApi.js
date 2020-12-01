import axiosClient from './axiosClient';

const oderApi = {
    getAll: () => {
        const url = '/api/oders';
        return axiosClient.get(url)
    },
    createOder: (cart) => {
        const url = '/api/oders';
        return axiosClient.post(url, cart)
    },
    updateOder: (id,check) => {
        const url = `/api/oders/${id}`
        return axiosClient.put(url,check)
    }
}

export default oderApi;