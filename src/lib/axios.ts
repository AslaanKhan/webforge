// lib/axiosInstance.js

import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api', // Change to your API base URL
    timeout: 10000, // Optional: Set a timeout
});

// Optional: Add interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        // Add any request configurations or headers
        // const token = localStorage.getItem('authToken'); // Or retrieve from cookies
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors globally
        return Promise.reject(error);
    }
);

export default axiosInstance;
