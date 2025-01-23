import { LogIn, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const Login = () => {
  useAuthRedirect();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {} as any;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      console.log("Login successful");
      // Redirect to dashboard or another page
    } catch (err) {
      console.log(err);
      console.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
          alt="Login illustration"
          className="object-cover w-full"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>ავტორიზაცია</CardTitle>
          </CardHeader>
          <CardContent>
            {globalError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{globalError}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">ელფოსტა</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="შეიყვანე შენი ელფოსტა"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">პაროლი</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="შეიყვანე შენი პაროლი"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-green hover:bg-[#45A049] "
                disabled={loading}
              >
                {loading ? "ავტორიზაცია..." : "შესვლა"}
              </Button>
            </form>
          </CardContent>
          <div className="text-center mb-5">
            <p className="text-sm text-muted-foreground">
              <Link to="/register" className="text-primary hover:underline po">
                არ გაქვს ანგარიში? - შექმენი
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
