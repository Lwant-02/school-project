import axios from "axios";
import type { Car } from "@/types/car";

const BASE_URL = "https://69a14c0b2e82ee536fa0c54e.mockapi.io/api/v1/car";

export const api = axios.create({ baseURL: BASE_URL });

export const getCars = () => api.get<Car[]>("/").then((r) => r.data);

export const getCarById = (id: string) =>
  api.get<Car>(`/${id}`).then((r) => r.data);

export const createCar = (data: Omit<Car, "id" | "createdAt">) =>
  api.post<Car>("/", data).then((r) => r.data);

export const updateCar = (id: string, data: Partial<Car>) =>
  api.put<Car>(`/${id}`, data).then((r) => r.data);

export const deleteCar = (id: string) => api.delete(`/${id}`);
