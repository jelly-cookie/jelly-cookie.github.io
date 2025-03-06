import axios from 'axios';

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchNews = async () => {
  try {
    const response = await axios.get('/news-data.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
