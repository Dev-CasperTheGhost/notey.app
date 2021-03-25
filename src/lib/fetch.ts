import axios, { AxiosResponse } from "axios";
import { ALLOWED_METHODS } from "./shared";

type RequestData = Record<string, unknown>;

export const handleRequest = (path: string, method: ALLOWED_METHODS, data: RequestData) => {
  return axios({
    url: `/api/v3${path}`,
    method,
    data: data ? data : null,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const isSuccess = (res: AxiosResponse): boolean => {
  return res.data.status === "success";
};
