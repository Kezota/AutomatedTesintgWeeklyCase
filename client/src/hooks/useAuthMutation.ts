// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { loginUser, registerUser } from "../services/authService";
// import { Admin, LoginFields, RegisterFields } from "@/lib/types";

// export const useLoginMutation = () => {
//   return useMutation<Admin, Error, LoginFields>(loginUser, {
//     onSuccess: (data: Admin) => {
//       toast.success(`Welcome back, ${data.email}!`);
//     },
//     onError: (error: Error) => {
//       console.error("Login error:", error);
//       toast.error("Login failed!");
//     },
//   });
// };

// export const useRegisterMutation = () => {
//   return useMutation<void, Error, RegisterFields>(registerUser, {
//     onSuccess: () => {
//       toast.success("Registration successful!");
//     },
//     onError: (error: Error) => {
//       console.error("Registration error:", error);
//       toast.error("Registration failed!");
//     },
//   });
// };
