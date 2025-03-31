import { API } from "@/lib/API";
import { Admin, LoginPayload, RegisterPayload } from "@/lib/types";

type LoginRegisterResponse = {
  token: string;
  user: Admin;
};

// Function to handle the login request
export const login = async (
  payload: LoginPayload
): Promise<LoginRegisterResponse> => {
  const response = await API.post<LoginRegisterResponse>("/login", payload);
  return response.data;
};

// Function to handle the register request
export const register = async (
  payload: RegisterPayload
): Promise<LoginRegisterResponse> => {
  const response = await API.post<LoginRegisterResponse>("/register", payload);
  return response.data;
};

// Function to handle the logout request
export const logout = async (): Promise<void> => {
  await API.post("/logout");
};
