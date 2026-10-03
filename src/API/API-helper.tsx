import axios, { AxiosRequestConfig } from 'axios';

class RestApiService {
  private static instance: RestApiService;

  private constructor() {
    // Private constructor to prevent external instantiation
  }

  public static getInstance(): RestApiService {
    if (!RestApiService.instance) {
      RestApiService.instance = new RestApiService();
    }

    return RestApiService.instance;
  }

  public fetchData = async (url: any, params = {}): Promise<any> => {
    try {
      const response = await axios.get(url, params);
      console.log('Fetching data');
      return response.data;
    } catch (error) {
      console.error('Error fetching API data:', error);
      throw error;
    }
  };

  public getAllData = async (url: any, data: any, token: string): Promise<any> => {
    try {
      console.log(url + ' get all called' + JSON.stringify(data));
      console.log(`Bearer ${token}`);
      var config: AxiosRequestConfig = {
        headers: {
          'Sec-Fetch-Mode': 'cors',
          'Authorization': `Bearer ${token}`,
       //  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InByIiwic3ViIjoicHIiLCJpYXQiOjE2ODU5NDA0NzgsImV4cCI6MTY4NjAyNjg3OH0.aH_N-pQyYwRPIte3C46Cra-iL9Zbb5sIT_3NRnIYnkA',
          'Content-Type': 'application/json',
        //  Accept: 'application/json',
        },
      };
      console.log(JSON.stringify(config));
      const response = await axios.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error('Error in API request:', error);
      throw error;
    }
  };

  public createData = async (url: any, data: any): Promise<any> => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Error creating API data:', error);
      throw error;
    }
  };

  public updateData = async (url: any, data: any): Promise<any> => {
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      console.error('Error updating API data:', error);
      throw error;
    }
  };

  public deleteData = async (url: any): Promise<any> => {
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Error deleting API data:', error);
      throw error;
    }
  };
}

// Export the instance of the singleton class
export default RestApiService.getInstance();
