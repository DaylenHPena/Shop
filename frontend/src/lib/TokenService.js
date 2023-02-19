import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

// Working with the tokens in localStorage
const AUTHTOKEN_IDENTIFIER = "authTokens";

const getAccessToken = () =>
  localStorage.getItem(AUTHTOKEN_IDENTIFIER)
    ? JSON.parse(localStorage.getItem(AUTHTOKEN_IDENTIFIER))?.access
    : null;

export default {
  getAccessToken() {
    return getAccessToken();
  },
  getRefreshToken() {
    return localStorage.getItem(AUTHTOKEN_IDENTIFIER)
      ? JSON.parse(localStorage.getItem(AUTHTOKEN_IDENTIFIER))?.refresh
      : null;
  },

  updateAuthTokens(authTokens) {
    localStorage.setItem(AUTHTOKEN_IDENTIFIER, JSON.stringify(authTokens));
  },

  getUserId() {
    try {
      return jwt_decode(getAccessToken())?.user_id;
    } catch (error) {
      return undefined;
    }
  },
  getUsername() {
    try {
      return jwt_decode(getAccessToken())?.username;
    } catch (error) {
      return undefined;
    }
  },
  removeTokens() {
    {
      localStorage.removeItem(AUTHTOKEN_IDENTIFIER);
    }
  },

  tokenIsExpired() {
    {
      const accessToken = getAccessToken();
      if (accessToken) {
        const accessTokenDecoded = jwt_decode(accessToken);
        const expiration_time = dayjs.unix(accessTokenDecoded.exp);
        const now = dayjs();
        if (accessTokenDecoded) {
          const is_expired = expiration_time - now < 0;
          return is_expired;
        }
      }
      return false;
    }
  },
};
