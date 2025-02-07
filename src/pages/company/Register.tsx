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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import regImage from "../../assets/19184614_6101000 2.png";

type RegistrationStep = "form" | "verification" | "success";

interface CompanyFormData {
  companyEmail: string;
  companyName: string;
  password: string;
  website: string;
  address: string;
  description: string;
}

interface FormError {
  field: string;
  message: string;
}

function CompanyRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState<RegistrationStep>("form");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [generalError, setGeneralError] = useState<string>("");
  const [formData, setFormData] = useState<CompanyFormData>({
    companyEmail: "",
    password: "",
    companyName: "",
    website: "",
    address: "",
    description: "",
  });
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { registerCompany } = useAuth();

  useEffect(() => {
    if (step === "verification") {
      const ws = new WebSocket(
        `ws://localhost:8080/ws/verification/${formData.companyEmail}`
      );

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onerror = (error) => {
        setGeneralError("ვერიფიკაცია ვერ მოხერხდა. სცადეთ თავიდან.");
        setStep("form");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.token) {
            localStorage.setItem("token", data.token);
            setStep("success");
            setTimeout(() => {
              navigate("/company/dashboard");
            }, 3000);
          }
        } catch (error) {
          setGeneralError("ვერიფიკაცია ვერ მოხერხდა. სცადეთ თავიდან.");
          setStep("form");
        }
      };

      setSocket(ws);
      return () => {
        ws.close();
      };
    }
  }, [step, formData.companyEmail]);

  const validateForm = (): boolean => {
    const newErrors: FormError[] = [];

    if (formData.companyName.length < 2) {
      newErrors.push({
        field: "companyName",
        message: "კომპანიის სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს",
      });
    }

    if (!formData.companyEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
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
      await registerCompany(formData);
      setStep("verification");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-800 flex flex-col">
      <header className="p-6 bg-transparent text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Logo</h1>
        </div>
      </header>

      <div className="flex-1 container mx-auto">
        <div className="flex min-h-full">
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
                      კომპანიის რეგისტრაცია
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
                          კომპანიის სახელი
                        </legend>
                        <div className="relative">
                          <Building2 className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                          <input
                            type="text"
                            placeholder="შეიყვანეთ კომპანიის სახელი"
                            className={inputClasses("companyName") + " pl-10"}
                            value={formData.companyName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                companyName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        {getFieldError("companyName") && (
                          <p className="mt-1 text-sm text-red-500">
                            {getFieldError("companyName")}
                          </p>
                        )}
                      </fieldset>

                      <fieldset className="w-full">
                        <legend className="block text-sm font-medium text-white/80 mb-2">
                          კომპანიის ელ-ფოსტა
                        </legend>
                        <div className="relative">
                          <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                          <input
                            type="email"
                            placeholder="შეიყვანეთ კომპანიის ელ-ფოსტა"
                            className={inputClasses("companyEmail") + " pl-10"}
                            value={formData.companyEmail}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                companyEmail: e.target.value,
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

                      <fieldset className="w-full">
                        <legend className="block text-sm font-medium text-white/80 mb-2">
                          ვებსაიტი (არასავალდებულო)
                        </legend>
                        <div className="relative">
                          <Globe className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                          <input
                            placeholder="შეიყვანეთ კომპანიის ვებსაიტი"
                            className={inputClasses("website") + " pl-10"}
                            value={formData.website}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                website: e.target.value,
                              })
                            }
                          />
                        </div>
                      </fieldset>

                      <fieldset className="w-full">
                        <legend className="block text-sm font-medium text-white/80 mb-2">
                          მისამართი (არასავალდებულო)
                        </legend>
                        <div className="relative">
                          <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                          <input
                            type="text"
                            placeholder="შეიყვანეთ კომპანიის მისამართი"
                            className={inputClasses("address") + " pl-10"}
                            value={formData.address}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: e.target.value,
                              })
                            }
                          />
                        </div>
                      </fieldset>

                      <fieldset className="w-full">
                        <legend className="block text-sm font-medium text-white/80 mb-2">
                          კომპანიის აღწერა (არასავალდებულო)
                        </legend>
                        <div className="relative">
                          <FileText className="w-5 h-5 absolute left-3 top-3 text-white/50" />
                          <textarea
                            placeholder="მოკლედ აღწერეთ თქვენი კომპანია"
                            className={
                              inputClasses("description") +
                              " pl-10 min-h-[100px]"
                            }
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>
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
                        {formData.companyEmail}
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
                    <h2 className="text-2xl font-bold text-white mb-2">
                      ვერიფიკაცია წარმატებულია!
                    </h2>
                    <p className="text-white/80">
                      თქვენი ელ.ფოსტა წარმატებით დადასტურდა.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-1/2 p-4 pt-16 flex items-center justify-center flex-col text-center">
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
              შექმენი შენი <span className="text-green">კომპანიის </span>პროფილი
            </h1>
            <p className="text-lg text-green-100 mb-8 max-w-2xl leading-relaxed">
              ციფრულად მართეთ HR პროცესები და აწარმოეთ რეკრუტმენტის სრული ციკლი
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

export default CompanyRegister;
