import axios from 'axios';
// require('dotenv').config();

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});
