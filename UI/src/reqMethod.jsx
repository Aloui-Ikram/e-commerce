import axios from 'axios';

const B_URL = "http://localhost:3000/api/";

// Retrieve user data from localStorage
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const userToken = currentUser?.accessToken;

// Retrieve admin data from localStorage
const admin = JSON.parse(localStorage.getItem("persist:root"))?.admin;
const currentAdmin = admin && JSON.parse(admin).currentAdmin;
const adminToken = currentAdmin?.accessToken;

export const pubReq = axios.create({
  baseURL: B_URL,
});

export const userReq = axios.create({
  baseURL: B_URL,
  headers: { token: userToken ? `Bearer ${userToken}` : '' },
});

export const adminReq = axios.create({
  baseURL: B_URL,
  headers: { token: adminToken ? `Bearer ${adminToken}` : '' },
});
