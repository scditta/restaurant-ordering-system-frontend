import axios from 'axios';
// require('dotenv').config();

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    api_key: process.env.REACT_APP_API_KEY,
  },
});
