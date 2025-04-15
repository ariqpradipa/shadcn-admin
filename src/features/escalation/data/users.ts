import axios from 'axios';

export const users = async () => {
  const response = await axios.get('/users');

  return response.data.data;
}
