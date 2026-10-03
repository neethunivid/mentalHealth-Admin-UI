import axios, { AxiosInstance } from 'axios';
import config from '../config.json';
import { headers } from '../API/header';
import { error } from 'console';

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;


  private constructor() {
    // Set your base API URL
    const baseURL = config.api.url;

    // Create an Axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      // You can add additional default headers or configurations here
      headers: ApiClient.getHeaders()
    });

    

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status && (error.response.status === 401 || error.response.status === 403)) {
          window.location.href = "/logout"
        }
        return Promise.reject(error);
      }
    );


  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public setToken(token: string) {
    sessionStorage.setItem("token", token);
    ApiClient.instance = new ApiClient();
    return ApiClient.instance;
    //this.axiosInstance.defaults.headers = ApiClient.getHeaders();
  }

  public static getToken() {
    return sessionStorage.getItem('token');
  }
  static getHeaders() {
    const token = ApiClient.getToken();
    let retVal: any = {};
    if (token) {
      retVal['Authorization'] = `Bearer ${token}`
    }
    return retVal
  }
  

  // Method for making GET requests
  get(url: string, config?: any) {
    return this.axiosInstance.get(url, config);
  }

  // Method for making POST requests
  post(url: string, data?: any, config?: any) {
    return this.axiosInstance.post(url, data, config);
    // return this.axiosInstance.post(url, data, { ...config, headers });
  }

  // Method for making PUT requests
  put(url: string, data?: any, config?: any) {
    return this.axiosInstance.put(url, data, config);
  }

  // Method for making DELETE requests
  delete(url: string, config?: any) {
    return this.axiosInstance.delete(url, config);
  }
}

// Create a singleton instance of the ApiClient class
const apiClient = ApiClient.getInstance();

export default apiClient;
