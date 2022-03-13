import axios from 'axios';

//const api = axios.create( { baseURL: 'https://cors-anywhere.herokuapp.com//viacep.com.br/ws' });
const apiCep = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

export default apiCep;
