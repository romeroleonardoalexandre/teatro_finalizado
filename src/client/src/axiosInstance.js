import axios from "axios"

export  default axios.create({
  baseURL: 'http://localhost:8087',
  timeout: 1000
});
