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
  Globe,
  FileText,
  MapPin,
} from "lucide-react";
import { clsx } from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import regImage from "../../assets/19184614_6101000 2.png";

interface CompanyFormData {
  email: string;
  password: string;
}

interface FormError {
  field: string;
  message: string;
}

function CompanyLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [generalError, setGeneralError] = useState<string>("");
  const [formData, setFormData] = useState<CompanyFormData>({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: FormError[] = [];

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.push({
        field: "companyEmail",
        message: "შეიყვანეთ ვალიდური ელ-ფოსტა",
      });
    }

    if (formData.password.length < 8) {
      newErrors.push({
        field: "password",
        message: "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს",
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
      await login(formData);
      navigate("/user/dashboard");
    } catch (err: any) {
      setGeneralError(
        err.message || "რეგისტრაცია ვერ მოხერხდა. ცადეთ ხელახლა."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = (field: string) =>
    clsx(
      "w-full px-4 py-2 bg-white/10 rounded-lg border text-white placeholder:text-white/50",
      "focus:outline-none focus:ring-2  focus:ring-green-500 focus:border-transparent",
      "transition-all duration-200",
      {
        "border-red-500": getFieldError(field),
        "border-white/20": !getFieldError(field),
      }
    );

  const buttonClasses =
    "w-full py-3 bg-green text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-800 flex flex-col">
      <header className="p-6 bg-transparent text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">TalentHub</h1>
        </div>
      </header>

      <div className="flex-1 container mx-auto">
        <div className="flex min-h-full">
          <div className="w-1/2 p-4 pt-16">
            <div className="w-full max-w-xl mx-auto">
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/10 p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  მომხმარებლის აუტორიზაცია
                </h2>

                {generalError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{generalError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <fieldset className="w-full">
                    <legend className="block text-sm font-medium text-white/80 mb-2">
                      მომხმარებლის ელ-ფოსტა
                    </legend>
                    <div className="relative">
                      <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                      <input
                        type="email"
                        placeholder="მომხმარებლის კომპანიის ელ-ფოსტა"
                        className={inputClasses("companyEmail") + " pl-10"}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    {getFieldError("companyEmail") && (
                      <p className="mt-1 text-sm text-red-500">
                        {getFieldError("companyEmail")}
                      </p>
                    )}
                  </fieldset>

                  <fieldset className="w-full">
                    <legend className="block text-sm font-medium text-white/80 mb-2">
                      პაროლი
                    </legend>
                    <div className="relative">
                      <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                      <input
                        type="password"
                        placeholder="შეიყვანეთ პაროლი"
                        className={inputClasses("password") + " pl-10"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
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
                        მიმდინარეობს ავტორიზაცია...
                      </>
                    ) : (
                      "ავტორიზაცია"
                    )}
                  </button>
                </form>
                <div className="mt-6">
                  <span className="text-muted"> არ გაქვს ანგარიში? </span>
                  <Link
                    className="text-green-300 cursor-pointer underline"
                    to="/user/register"
                  >
                    {" "}
                    გაიარე რეგისტრაცია და შექმენი პროფილი{" "}
                  </Link>
                </div>
                <div className="mt-2">
                  <span className="text-muted">
                    {" "}
                    გინდა ვაკანსიის განთავსება?{" "}
                  </span>
                  <Link
                    className="text-green-300 cursor-pointer underline"
                    to="/company/register"
                  >
                    {" "}
                    დაარეგისტრირე კომპანია{" "}
                  </Link>
                </div>
              </motion.div>
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

export default CompanyLogin;
