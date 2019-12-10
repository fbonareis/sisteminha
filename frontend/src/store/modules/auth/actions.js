import { AUTH_REQUEST, AUTH_REQUEST_SUCCESS } from "./types";

export const authRequest = (email, password) => ({
  type: AUTH_REQUEST,
  email: email,
  password: password
});

export const authRequestSuccess = () => ({
  type: AUTH_REQUEST_SUCCESS
});
