import { base_url,getDataLocalStorage} from '../utils/constains';
const axios = require('axios').default;
const token=getDataLocalStorage('token')==null?"":getDataLocalStorage('token');
const instance = (() => {
    return axios.create({
        baseURL: base_url,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
   
});
instance().interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor
instance().interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default instance;