import axios from 'axios';
import queryString from 'query-string';




const axiosClient = axios.create({
    baseURL: 'https://shop4menss.herokuapp.com/',
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
        const a = JSON.parse(localStorage.getItem("token"))
        config.headers.Authorization ='Bearer ' + a.access_token;
    }


    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;
