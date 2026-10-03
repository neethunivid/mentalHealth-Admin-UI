import axios, { AxiosInstance } from 'axios';
import config from '../config.json';
import { headers } from '../API/header';
import { error } from 'console';

class LibraryApiClient {
  private static instance: LibraryApiClient;
  private axiosInstance: AxiosInstance;


  private constructor() {
    // Set your base API URL
    const baseURL = config.libraryapi.url;

    // Create an Axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      // You can add additional default headers or configurations here
      headers: LibraryApiClient.getHeaders()
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

  static getInstance(): LibraryApiClient {
    if (!LibraryApiClient.instance) {
      LibraryApiClient.instance = new LibraryApiClient();
    }
    return LibraryApiClient.instance;
  }

  public setToken(token: string) {
    sessionStorage.setItem("token", token);
    LibraryApiClient.instance = new LibraryApiClient();
    return LibraryApiClient.instance;
    //this.axiosInstance.defaults.headers = LibraryApiClient.getHeaders();
  }

  public static getToken() {
    return sessionStorage.getItem('token');
  }
  static getHeaders() {
    const token = LibraryApiClient.getToken();
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
    let headers;
      headers = LibraryApiClient.getHeaders(); 
    if (data.file) {
      headers['Content-Type'] = 'multipart/form-data';
    }
    if (data.pdfFiles) {
      headers['Content-Type'] = 'multipart/form-data';
    }
    return this.axiosInstance.post(url, data, { ...config, headers });
  }

  // Method for making PUT requests
  put(url: string, data?: any, config?: any) {
    let headers;
      headers = LibraryApiClient.getHeaders(); 
    if (data.pdfFile) {
      headers['Content-Type'] = 'multipart/form-data';
    }
    return this.axiosInstance.put(url, data, { ...config, headers });
  }

  // Method for making DELETE requests
  delete(url: string, config?: any) {
    return this.axiosInstance.delete(url, config);
  }
}

// Create a singleton instance of the LibraryApiClient class
const LibraryapiClient = LibraryApiClient.getInstance();

export default LibraryapiClient;
