import axiosInstance from "./axiosInstance";

export const GET_REQUEST = (url: string) => axiosInstance.get(url);
export const POST_REQUEST = (url: string, data: any) =>
  axiosInstance.post(url, data);
export const PUT_REQUEST = (url: string, data: any) =>
  axiosInstance.put(url, data);
export const DELETE_REQUEST = (url: string) => axiosInstance.delete(url);
