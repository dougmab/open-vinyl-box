import axios from "axios";
import {getCookie} from "cookies-next";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";

type cookiesCallable = () => ReadonlyRequestCookies;

export const getApiClient = (cookies?: cookiesCallable) => {
  const token = getCookie("ovb.token", { cookies });

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : undefined
    }
  });
}

export default getApiClient();
