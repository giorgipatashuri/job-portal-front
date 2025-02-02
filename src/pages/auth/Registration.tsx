// components/Register.tsx

import { useState } from "react";

// import bgImage from "../public/bg.jpg"; // Replace with your image path
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { User, Mail, Link, Lock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { useAuth } from "../../context/AuthContext";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";

const RegisterSec = () => {
  useAuthRedirect();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors = {} as any;

    if (!formData.name.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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

  const handleUserTypeChange = (value: any) => {
    setFormData((prev) => ({
      ...prev,
      userType: value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setGlobalError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(formData);
      console.log(formData);
      console.log("register successful");
    } catch (err) {
      console.log(err);
      console.error("Login failed");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
          alt="Register illustration"
          className="object-cover w-full"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>შექმენი ახალი მომხმარებელი</CardTitle>
          </CardHeader>
          <CardContent>
            {globalError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{globalError}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">სახელი</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="შეიყვანე შენი სახელი"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">გვარი</Label>
                  <Input
                    id="lastNname"
                    name="lastname"
                    placeholder="შეიყვანე შენი გვარი"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">იუზერნეიმი</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="აირჩიე იუზერნეიმი"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? "border-red-500" : ""}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">ელფოსტა</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="შეყვანე შენი ელფოსტა"
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
                  placeholder="შექმენი პაროლი"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType">აირჩიე მომხმარებლის ტიპი</Label>
                <Select
                  value={formData.userType}
                  onValueChange={handleUserTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="აირჩიე მომხმარებლის ტიპი" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">მომხმარებელი</SelectItem>
                    <SelectItem value="HR">დამსაქმებელი</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-green"
                disabled={loading}
              >
                {loading
                  ? "მომხმარებლის შექმნა..."
                  : "შექმენი ახალი მომხმარებელი"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
