import Login from "@/pages/Login";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

jest.mock("@/hooks/useAuthMutation", () => ({
  useLoginMutation: () => ({
    mutate: jest.fn(),
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

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
