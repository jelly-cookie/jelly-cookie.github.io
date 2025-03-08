import axios from 'axios';

export const fetchNews = async () => {
  try {
    const response = await axios.get('/news-data.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
