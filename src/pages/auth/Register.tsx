import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  CheckCircle2,
  Building2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import regImage from "../../assets/19184614_6101000 2.png";

type RegistrationStep = "form" | "verification" | "success";

interface FormData {
  email: string;
  name: string;
  password: string;
  lastname: string;
}

interface FormError {
  field: string;
  message: string;
}

function App() {
  const navigate = useNavigate();
  const [step, setStep] = useState<RegistrationStep>("form");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [generalError, setGeneralError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    lastname: "",
    name: "",
  });
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { register } = useAuth();

  useEffect(() => {
    if (step === "verification") {
      const ws = new WebSocket(
        `ws://localhost:8080/ws/verification/${formData.email}`
      );

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onerror = (error) => {
        setGeneralError("Verification connection failed. Please try again.");
        setStep("form");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.token) {
            localStorage.setItem("token", data.token);
            setStep("success");
            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          }
        } catch (error) {
          setGeneralError("Failed to process verification. Please try again.");
          setStep("form");
        }
      };

      setSocket(ws);
      return () => {
        ws.close();
      };
    }
  }, [step, formData.email]);

  const validateForm = (): boolean => {
    const newErrors: FormError[] = [];

    if (formData.name.length < 2) {
      newErrors.push({
        field: "name",
        message: "First name must be at least 2 characters",
      });
    }

    if (formData.lastname.length < 2) {
      newErrors.push({
        field: "lastname",
        message: "Last name must be at least 2 characters",
      });
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.push({
        field: "email",
        message: "Please enter a valid email address",
      });
    }

    if (formData.password.length < 8) {
      newErrors.push({
        field: "password",
        message: "Password must be at least 8 characters",
      });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const getFieldError = (field: string): string => {
    return errors.find((error) => error.field === field)?.message || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      setStep("verification");
    } catch (err: any) {
      setGeneralError(
        err.message || "Registration failed. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = (field: string) =>
    clsx(
      "w-full px-4 py-2 bg-white/10 rounded-lg border text-white placeholder:text-white/50",
      "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
      "transition-all duration-200",
      {
        "border-red-500": getFieldError(field),
        "border-white/20": !getFieldError(field),
      }
    );

  const buttonClasses =
    "w-full py-3 bg-green text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900  to-green flex flex-col">
      {/* Header */}
      <header className="p-6 bg-transparent text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Logo</h1>
          {/* <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-green-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300">
                  Contact
                </a>
              </li>
            </ul>
          </nav> */}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto">
        <div className="flex min-h-full">
          {/* Left Side - Form */}
          <div className="w-1/2 p-4 pt-16">
            <div className="w-full max-w-xl mx-auto">
              <AnimatePresence mode="wait">
                {step === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white/10 p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-xl"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                      რეგისტრაცია
                    </h2>

                    {/* General Error Message */}
                    {generalError && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{generalError}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* First Name */}
                      <fieldset className="w-full">
                        <legend className="block text-sm font-medium text-white/80 mb-2">
                          სახელი
                        </legend>
                        <input
                          type="text"
                          id="firstName"
                          placeholder="შეიყვანე შენი სახელი"
                          className={inputClasses("name")}
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                        {getFieldError("name") && (
                          <p className="mt-1 text-sm text-red-500">
                            {getFieldError("name")}
                          </p>
                        )}
                      </fieldset>

                      {/* Last Name */}
                      <fieldset className="w-full">
                        <legend className="block text-sm font-medium text-white/80 mb-2">
                          გვარი
                        </legend>
                        <input
                          type="text"
                          id="lastName"
                          placeholder="შეიყვანე შენი გვარი"
                          className={inputClasses("lastname")}
                          value={formData.lastname}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastname: e.target.value,
                            })
                          }
                          required
                        />
                        {getFieldError("lastname") && (
                          <p className="mt-1 text-sm text-red-500">
                            {getFieldError("lastname")}
                          </p>
                        )}
                      </fieldset>

                      {/* Email */}
                      <fieldset className="w-full">
                        <legend className="block text-sm font-medium text-white/80 mb-2">
                          ელ-ფოსტა
                        </legend>
                        <input
                          type="email"
                          id="email"
                          placeholder="შეიყვანე შენი ელ-ფოსტა"
                          className={inputClasses("email")}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                        {getFieldError("email") && (
                          <p className="mt-1 text-sm text-red-500">
                            {getFieldError("email")}
                          </p>
                        )}
                      </fieldset>

                      {/* Password */}
                      <fieldset className="w-full">
                        <legend className="block text-sm font-medium text-white/80 mb-2">
                          პაროლი
                        </legend>
                        <input
                          type="password"
                          id="password"
                          placeholder="შეიყვანე შენი პაროლი"
                          className={inputClasses("password")}
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                        {getFieldError("password") && (
                          <p className="mt-1 text-sm text-red-500">
                            {getFieldError("password")}
                          </p>
                        )}
                      </fieldset>

                      <button
                        type="submit"
                        className={buttonClasses}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            მიმდინარეობს რეგისტრაცია...
                          </>
                        ) : (
                          "რეგისტრაცია"
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === "verification" && (
                  <motion.div
                    key="verification"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-black/30 p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-xl text-center"
                  >
                    <Mail className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-4">
                      გთხოვთ შეამოწმოთ თქვენი ელ-ფოსტა
                    </h2>
                    <p className="text-white/70 mb-6">
                      ვერიფიკაციის <br />
                      <span className="text-white font-medium">
                        {formData.email}
                      </span>
                    </p>
                    <div className="flex items-center justify-center text-green-500 bg-green-50 py-3 px-4 rounded-lg">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      ველოდებით ვერიფიკაციას...
                    </div>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black/30 p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-xl text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    </motion.div>
                    <img src="" alt="" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-1/2 p-4 pt-16 flex items-center justify-center flex-col text-center">
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
              მოძებნე შენზე მორგებული სამსახური შენთან ახლოს
            </h1>
            <p className="text-lg text-green-100 mb-8 max-w-2xl leading-relaxed">
              გაიმარტივე CV - ს შექმნის და გაგზავნის პროცედურა, მიიღე შენზე
              მორგებული შემოთავაზებები და დაზოგე შენი დრო
            </p>
            <img
              src={regImage}
              alt="Registration Illustration"
              className="w-full max-w-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
