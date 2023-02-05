import axios from "axios";

const _axios = axios.create({
  baseURL: process.env.API_URL,
});

export default _axios;
