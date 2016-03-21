import axios from 'axios';

export default {

  get: () => (
    axios
      .get('http://localhost:8888/api/todo')
      .then(response => response.data)
  ),

  save: (todos) => (
    axios.post('http://localhost:8888/api/todo', todos)
  ),
};
