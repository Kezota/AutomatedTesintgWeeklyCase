import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { loginUser } from "@/services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      await loginUser(loginData);
    } catch (error) {
      toast.error("Login failed!");
      console.error("Login error:", error);
    }
  };

  return (
    <section className="flex justify-center items-center pt-[130px]">
      <Card className="w-full max-w-sm p-8 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white"
              // disabled={mutation.isLoading}
            >
              Login
              {/* {mutation.isLoading ? "Logging In..." : "Login"} */}
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default Login;
