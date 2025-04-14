import axios from 'axios';

export const organizations = async () => {
    const response = await axios.get('/organizations');

    return response.data.data;
}