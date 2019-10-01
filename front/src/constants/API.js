import axios from 'axios';

export const URL = "http://localhost:3000/";

export const AXIOS = axios.create({
  baseURL: URL,
  timeout: 1000
});
