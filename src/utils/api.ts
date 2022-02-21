import axios from 'axios';
import { api_url } from '../utils/urls';

export async function registerUser(registerForm: Object) {
    return axios.post(`${api_url}/api/auth/register`, registerForm);
}

export async function loginUser(loginForm: Object) {
    return axios.post(`${api_url}/api/auth/login`, loginForm);
}

export function getUserData() {
    return axios.get(`${api_url}/api/auth/`, { withCredentials: true });
}

export function logoutUser() {
    return axios.get(`${api_url}/api/auth/logout`, { withCredentials: true });
}

export function getUsers() {
    return axios.get(`${api_url}/api/users/list`, { withCredentials: true });
}

export function getUser(userId: any) {
    return axios.get(`${api_url}/api/users/data/${userId}`, { withCredentials: true });
}

export function updateUser(userId: any, updatedUserData: any) {
    return axios.post(`${api_url}/api/users/data/${userId}/update`, updatedUserData, { withCredentials: true });
}

export function deleteUser(userId: any) {
    return axios.post(`${api_url}/api/users/data/${userId}/delete`, {confirmed: true}, { withCredentials: true });
}

export function createBlogPost(blogData: any) {
    return axios.post(`${api_url}/api/blogs/create`, blogData, { withCredentials: true });
}

export function getBlogs() {
    return axios.get(`${api_url}/api/blogs/list`, { withCredentials: true });
}

export function getBlogsForGuest() {
    return axios.get(`${api_url}/api/blogs/page`);
}

export function getBlog(blogId: any) {
    return axios.get(`${api_url}/api/blogs/data/${blogId}`, { withCredentials: true });
}

export function getBlogForGuest(blogId: any) {
    return axios.get(`${api_url}/api/blogs/content/${blogId}`, { withCredentials: true });
}

export function updateBlogPost(blogId: any, blogData: any) {
    return axios.post(`${api_url}/api/blogs/data/${blogId}/update`, blogData, { withCredentials: true });
}

export function publishBlogPost(blogId: any) {
    return axios.post(`${api_url}/api/blogs/data/${blogId}/publish`, {confirmed: true}, { withCredentials: true });
}

export function hideBlogPost(blogId: any) {
    return axios.post(`${api_url}/api/blogs/data/${blogId}/hide`, {confirmed: true}, { withCredentials: true });
}

export function deleteBlogPost(blogId: any) {
    return axios.post(`${api_url}/api/blogs/data/${blogId}/delete`, {confirmed: true}, { withCredentials: true });
}