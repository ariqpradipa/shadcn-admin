import axios from 'axios';

export const appUserLevelsAppId = async (appId: string) => {
    const response = await axios.get(`/app-user-levels/app/${appId}`);

    return response.data.data;
}