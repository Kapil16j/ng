import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { API_BASE_URL } from './utils';

let isRefreshing = false; // Flag to prevent multiple refresh calls
let pendingRequests = []; // Store pending requests while refreshing

const processQueue = (error, token = null) => {
  pendingRequests.forEach((callback) => {
    if (error) {
      callback(error);
    } else {
      callback(null, token);
    }
  });
  pendingRequests = [];
};

export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log('Error intercepted:', error);
      const originalRequest = error.config;

      if (error.response?.status === 403 && 
          (error.response?.data?.detail === "Token has expired" || 
           error.response?.data?.detail === "Invalid token" || 
           error.response?.data?.detail === "Authorization header is missing")) {
        
        if (isRefreshing) {
          // If refresh is already in progress, wait for it to finish
          return new Promise((resolve, reject) => {
            pendingRequests.push((err, token) => {
              if (err) {
                reject(err);
              } else {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                resolve(axios(originalRequest));
              }
            });
          });
        }

        console.log('Token expired, attempting to refresh...');
        toast.warn("Session expired, attempting to login again!");

        isRefreshing = true; // Set the refreshing flag

        try {
          const refreshToken = Cookies.get('refreshtoken'); // Get the refresh token from cookies
    
          if (!refreshToken) {
            window.location.href = '/signin'; 
            throw new Error('No refresh token available'); // Handle case where no refresh token exists
          }
          console.log("refresh_token=", refreshToken);

          const refreshResponse = await axios.post(`${API_BASE_URL}/auth/token/refresh`, 
              { refresh_token: refreshToken },
              {
                  headers: {
                    authorization: `Bearer ${refreshToken}`,
                    'Content-Type': 'application/json', // Use application/json
                  },
              }
          );
          console.log('Refresh Token response:', refreshResponse);
          
          if (refreshResponse?.data?.data?.access_token) {
            const newAccessToken = refreshResponse.data.data.access_token;
            console.log('Token refreshed successfully, newAccessToken:', newAccessToken);
            Cookies.set('accesstoken', newAccessToken, { expires: 1 });
            Cookies.set('refreshtoken', newAccessToken, { expires: 7 });
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            // Retry the original request with the new access token
            processQueue(null, newAccessToken);
            return axios(originalRequest);
          }
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          // Handle refresh error, possibly redirect to login
          window.location.href = '/signin'; 
        } finally {
          isRefreshing = false; // Reset the refreshing flag
        }
      }

      return Promise.reject(error);
    }
  );
};
