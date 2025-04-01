import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "@/pages/Register";

const mockMutate = jest.fn();

jest.mock("@/hooks/useAuthMutation", () => ({
  useRegisterMutation: () => ({
    mutate: mockMutate,
    isLoading: false,
  }),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("Register Page", () => {
  it("renders the register form", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Periksa apakah elemen-elemen form register ada
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("allows the user to type in the email, password, and confirm password fields", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    // Simulasikan mengetik di input email, password, dan confirm password
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });

  it("shows an error if passwords do not match", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /register/i });

    // Simulasikan memasukkan password yang tidak cocok
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password456" },
    });
    fireEvent.click(submitButton);

    // Periksa apakah toast.error dipanggil
    expect(toast.error).toHaveBeenCalledWith("Passwords do not match!");
  });

  it("calls the register mutation when the form is submitted with valid data", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /register/i });

    // Simulasikan memasukkan data yang valid
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(submitButton);

    // Periksa apakah fungsi mutate dipanggil dengan data yang benar
    expect(mockMutate).toHaveBeenCalledWith(
      {
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      },
      expect.any(Object)
    );
  });
});
