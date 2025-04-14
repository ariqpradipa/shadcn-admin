import axios from 'axios';

export const groups = async () => {
    const response = await axios.get('/groups');

    return response.data.data;
}