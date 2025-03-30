import { API } from "@/lib/API";
import { Admin, LoginFields, RegisterFields } from "@/lib/types";
import { toast } from "react-toastify";

// Function to handle the login request
export const loginUser = async (loginData: LoginFields): Promise<Admin> => {
  try {
    const response = await API.post<Admin>("/login", loginData);
    return response.data;
  } catch (error) {
    toast.error("Login failed!");
    throw error;
  }
};

// Function to handle the register request
export const registerUser = async (
  registerData: RegisterFields
): Promise<void> => {
  try {
    await API.post("/register", registerData);
  } catch (error) {
    toast.error("Registration failed!");
    throw error;
  }
};
