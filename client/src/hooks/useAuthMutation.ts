import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { login, logout, register } from "@/services/authService";
import {
  LoginPayload,
  LoginRegisterResponse,
  RegisterPayload,
} from "@/lib/types";

export const useLoginMutation = (): UseMutationResult<
  LoginRegisterResponse,
  Error,
  LoginPayload,
  unknown
> => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!");
      console.log("User logged in:", data.user);
    },
    onError: (error) => {
      toast.error("Login failed!");
      console.error("Login error:", error.message);
    },
  });
};

export const useRegisterMutation = (): UseMutationResult<
  LoginRegisterResponse,
  Error,
  RegisterPayload,
  unknown
> => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Registration successful & logged in!");
    },
    onError: (error) => {
      console.error("Register error:", error);
      toast.error("Registration failed!");
    },
  });
};

export const useLogoutMutation = (): UseMutationResult<
  void,
  Error,
  void,
  unknown
> => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Logged out successfully");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    },
  });
};
