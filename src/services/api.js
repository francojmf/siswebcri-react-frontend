import axios from 'axios';

export const ID_PRODUTO = '&id-produto';
export const NOME_PRODUTO = '&nome-produto';
export const TIPO_PRODUTO = '&tipo-produto';

export const setIdProduto = (id) => localStorage.setItem(ID_PRODUTO, id);
export const getIdProduto = () => localStorage.getItem(ID_PRODUTO);
export const setNomeProduto = (nome) =>
  localStorage.setItem(NOME_PRODUTO, nome);
export const getNomeProduto = () => localStorage.getItem(NOME_PRODUTO);

export const setTipoProduto = (tipo) =>
  localStorage.setItem(TIPO_PRODUTO, tipo);
export const getTipoProduto = () => localStorage.getItem(TIPO_PRODUTO);
const api = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: 'https://siswebcri-react-backend.herokuapp.com',
});

export default api;
