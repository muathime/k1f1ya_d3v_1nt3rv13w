import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authLogin = async (username: string, password: string) => {
  const response = await apiClient.post("/login", { username, password });
  return response.data;
};

export const updateKyc = async (data: any) => {
  const response = await apiClient.post("/kyc", data);
  return response.data;
};

export const logTransaction = async (data: any) => {
  const response = await apiClient.post("/transaction", data);
  return response.data;
};

export const getTransactions = async (data: any) => {
  const response = await apiClient.get(
    `/transactions?user_id=${data.user_id}`,
    {
      headers: {
        Authorization: `Bearer ${data?.token}`,
      },
    }
  );
  return response.data;
};
