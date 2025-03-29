import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = (credentials) => axios.post(`${API_URL}/auth/login`, credentials);
export const fetchUsers = (token) => axios.get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } });
export const deleteUser = (id, token) => axios.delete(`${API_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
