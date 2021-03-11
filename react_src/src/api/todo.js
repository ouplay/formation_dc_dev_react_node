import axios from 'axios';

export function get(id) {
    return axios.get(`http://localhost:3001/todo/${id}`)
}

export function update(id, newList) {
    return axios.post(`http://localhost:3001/todo/${id}`, newList);
}