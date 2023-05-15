import axios from 'axios';

export default axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  params: {
    ts: process.env.REACT_APP_TS,
    apikey: process.env.REACT_APP_API_KEY,
    hash: process.env.REACT_APP_HASH,
  },
});
