import axios from 'axios';

//const api = axios.create( { baseURL: 'https://cors-anywhere.herokuapp.com//viacep.com.br/ws' });
const apiUf = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
});

export default apiUf;
