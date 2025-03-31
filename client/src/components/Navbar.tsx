import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useLogoutMutation } from "@/hooks/useAuthMutation";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const { mutate, isLoading } = useLogoutMutation();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => navigate("/login"),
    });
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="text-2xl font-bold">ATE</div>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className="text-white hover:text-gray-400">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/dashboard"
                    className="text-white hover:text-gray-400"
                  >
                    Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Section: Auth Buttons */}
        <div className="flex space-x-2">
          {user ? (
            <>
              <span className="flex justify-center items-center mr-5">
                Hi, {user.email.split("@")[0]}
              </span>
              <Button
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-gray-700 text-white cursor-pointer"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="bg-gray-700 text-white cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gray-800 text-white cursor-pointer">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
