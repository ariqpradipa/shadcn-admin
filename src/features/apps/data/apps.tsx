import axios from 'axios';

export const apps = async () => {
  const response = await axios.get('/apps');

  return response.data.data;
}