import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: `https://tom-machado-desafio-final.herokuapp.com`,
  //baseURL: 'http://localhost:3000',
  mode: 'no-cors',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  },
});
