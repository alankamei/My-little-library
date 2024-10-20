import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Check for 401 Unauthorized error
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh');
                const response = await axios.post('http://localhost:8000/api/token/refresh/', {
                    refresh: refreshToken,
                });

                // Save the new access token
                localStorage.setItem('access', response.data.access);
                // Update the Authorization header for the original request
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;

                // Retry the original request with the new token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                // Optionally, handle logout or redirect to login here
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
