import axios from "axios";
import {parseCookies} from "nookies";
import * as next from "next";

export const getApiClient = (ctx?: Pick<next.NextPageContext, 'req'>) => {
  const {'ovb.token': token} = parseCookies(ctx)

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : undefined
    }
  });
}

export default getApiClient();
