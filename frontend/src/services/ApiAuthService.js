import axios from "axios";
import {  baseURL } from "../lib/AxiosConfig";
import TokenService from "../lib/TokenService";

export default {
  async getToken(values) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseURL}token/`, values)
        .then((response) => {
          //returns the access and refresh token
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async refreshAccessToken() {
    const refreshToken = TokenService.getRefreshToken();
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseURL}token/refresh/`, { refresh: refreshToken })
        .then((response) => {
          //returns a new access token
          console.log("refreshing token");
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  },
};
