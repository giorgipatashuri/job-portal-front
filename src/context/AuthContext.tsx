import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import api from "../lib/api";

interface AuthContextType {
  user: any;
  company: any;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  registerCompany: (companyData: any) => Promise<void>;
  loginCompany: (credentials: any) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  isCompanyAuthenticated: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  fetchCompany: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      localStorage.removeItem("token");
      setUser(null);
      setError("Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompany = async () => {
    const companyToken = localStorage.getItem("companyToken");
    console.log(companyToken);
    if (!companyToken) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.get("auth/company/me", {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });
      if (data) {
        setCompany(data);
      } else {
        setCompany(null);
      }
    } catch (err) {
      console.error("Error fetching company:", err);
      // localStorage.removeItem("companyToken");
      setCompany(null);
      setError("Failed to fetch company data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCompany();
  }, []);

  const login = async (credentials: any) => {
    try {
      setIsLoading(true);
      console.log("test");
      const { data } = await api.post("auth/login", credentials);
      localStorage.setItem("token", data.token);
      await fetchUser();
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginCompany = async (credentials: any) => {
    try {
      setIsLoading(true);
      const { data } = await api.post("auth/company/login", credentials);
      console.log(data.token);
      localStorage.setItem("companyToken", data.token);
      await fetchCompany();
      setError(null);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Company login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      const { data } = await api.post("auth/register", userData);
      localStorage.setItem("token", data.token);
      await fetchUser();
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const registerCompany = async (companyData: any) => {
    try {
      setIsLoading(true);
      const { data } = await api.post("auth/company/register", companyData);
      localStorage.setItem("companyToken", data.token);
      await fetchCompany();
      setError(null);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Company registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("companyToken");
    setUser(null);
    setCompany(null);
    setError(null);
  };

  const value = useMemo(
    () => ({
      user,
      company,
      login,
      logout,
      register,
      registerCompany,
      loginCompany,
      isLoading,
      isAuthenticated: !!user || !!company,
      isCompanyAuthenticated: !!company,
      error,
      fetchUser,
      fetchCompany,
    }),
    [user, company, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
