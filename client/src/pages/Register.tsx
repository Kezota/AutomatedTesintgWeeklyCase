import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/hooks/useAuthMutation";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const { mutate, isLoading } = useRegisterMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    mutate(
      { email, password, confirmPassword },
      {
        onSuccess: () => navigate("/dashboard"),
      }
    );
  };

  return (
    <section className="flex justify-center items-center pt-[80px]">
      <Card className="w-full max-w-sm p-8 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister}>
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

          <div className="mb-4">
            <Label
              htmlFor="confirm-password" // Perbarui id agar unik
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </Label>
            <Input
              id="confirm-password" // Perbarui id agar unik
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm your password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full bg-green-500 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default Register;
