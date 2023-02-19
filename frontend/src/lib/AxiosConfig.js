import axios from "axios";
import ApiAuthService from "../services/ApiAuthService";
import TokenService from "./TokenService";

export const baseURL = "http://localhost:8000/api/";

export const AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});

AxiosInstance.interceptors.request.use(
  async (req) => {
    await updateCredentials();
    const accessToken = TokenService.getAccessToken();
    req["headers"]["Authorization"] = accessToken
      ? "Bearer " + accessToken
      : null;
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      await updateCredentials();
      const access_token = await TokenService.getAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return AxiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const updateCredentials = async () => {
  return new Promise((resolve, reject) => {
    if (TokenService.tokenIsExpired()) {
      updateToken()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.log("Connection to server lost");
          reject(error);
        });
    } else {
      resolve();
    }
  });
};

const updateToken = async () => {
  return new Promise((resolve, reject) => {
    if (!TokenService.getAccessToken()) {
      reject("No user found");
    }
    ApiAuthService.refreshAccessToken()
      .then((tokens) => {
        TokenService.updateAuthTokens(tokens);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const axiosGet = (url, queryparams) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const axiosPost = (url, data) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.post(url, data)
      .then((response) => {
        console.log("axiosPost response", response);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const axiosPut = (url, data) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.put(url, data)
      .then((response) => {
        console.log("axiosPut response", response);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const axiosPatch = (url, data) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.patch(url, data)
      .then((response) => {
        console.log("axiosPatch response", response);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const axiosDelete = (url) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.delete(url)
      .then((response) => {
        console.log("axiosDelete response", response);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};
