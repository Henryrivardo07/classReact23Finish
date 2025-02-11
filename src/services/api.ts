import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'api-key': '0ICVyrNhPL56Oss58qv-_y42PhSQvYcPm6Vz26j4bNw',
  },
});
