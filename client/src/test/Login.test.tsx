import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";

const mockMutate = jest.fn();

jest.mock("@/hooks/useAuthMutation", () => ({
  useLoginMutation: () => ({
    mutate: mockMutate,
    isLoading: false,
  }),
}));

describe("Login Page", () => {
  it("renders the login form", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Periksa apakah elemen-elemen form login ada
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("allows the user to type in the email and password fields", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    // Simulasikan mengetik di input email dan password
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("calls the login mutation when the form is submitted", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Simulasikan mengetik dan submit form
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Periksa apakah fungsi mutate dipanggil dengan data yang benar
    expect(mockMutate).toHaveBeenCalledWith(
      { email: "test@example.com", password: "password123" },
      expect.any(Object) // Memastikan opsi tambahan juga diteruskan
    );
  });
});
