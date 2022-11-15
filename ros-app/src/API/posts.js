import axios from 'axios';
// require('dotenv').config();

export default axios.create({
  baseURL: 'https://restaurant-order-system.cyclic.app',
  headers: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});


