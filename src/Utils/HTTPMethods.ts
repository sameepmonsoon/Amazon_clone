import axios from "axios";
import { BASE_URL } from "./Credentials";
import Cookies from "js-cookie";
const token = Cookies.get("token");
// token remaining
function post(url: string, data: any) {
  if (!url) {
    throw new Error("Url isnot provided");
  }
  return axios.post(BASE_URL + url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// get method
function get(url: string) {
  if (!url) {
    throw new Error("Url isnot provided");
  }
  return axios.get(BASE_URL + url, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// put method
function put(url: string, data: any) {
  if (!url) {
    throw new Error("Url isnot provided");
  }
  return axios.put(BASE_URL + url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

//delete method
function deleteUser(url: string) {
  if (!url) {
    throw new Error("Url isnot provided");
  }
  return axios.delete(BASE_URL + url, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const HTTPMethods = {
  post,
  get,
  put,
  deleteUser,
};
