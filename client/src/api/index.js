import axios from 'axios';
import store from '../store'

export const API_URL = `http://localhost:3001`

export const api = axios.create({
    baseURL: API_URL
})

export const userApi = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use((request) => {
    request.headers.Authorization = localStorage.getItem('token')
    return request;
})

api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data._relogin) {
        try {
            const response = await axios.post(`${API_URL}/signin/new_token`, {}, { headers: { 'refreshtoken': localStorage.getItem('refresh') } })
            localStorage.setItem('token', response.data.accessToken);
            return api.request(originalRequest);
        } catch (e) {
            alert('you need to login')
            store.dispatch({type: 'LOGOUT'})
            console.log('NOT AUTHORIZED')
        }
    }
    throw error;
})
