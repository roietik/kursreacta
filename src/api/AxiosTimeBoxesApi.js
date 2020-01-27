import axios from 'axios';

// globalna zmienna do testowania w konsoli 
// window.axios = axios;

const BASE_URL = "http://localhost:3000/timeboxes"
const AxiosTimeboxesApi = {
    getAllTimeBoxes: async () => {
        const response = await axios.get(BASE_URL);
        const timeboxes = response.data;
        return timeboxes;
    }
}

export default AxiosTimeboxesApi;