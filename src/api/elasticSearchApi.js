import axios from 'axios';

export const axiosElasticSearch = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_DOMAIN_ELASTIC_SERVER,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  auth: {
    username: 'elastic',
    password: '8ZNgdsUIWNo5vx5RDTsw',
  },
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    // hostname: '127.0.0.1' // Takes precedence over 'host' if both are defined
    port: 9200,
  },
});

const elasticSearchApi = {
  search(request) {
    console.log(request);
    const url = '/posts/_search';
    return axiosElasticSearch.post(url, request);
  },
  getDocument(id) {
    const url = `/posts/_doc/${id}`;
    return axiosElasticSearch.get(url);
  },
};

export default elasticSearchApi;
