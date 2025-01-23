import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import api from "../lib/api";

// Add proper TypeScript interface
interface AuthContextType {
  user: any;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the user data
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      if (data) {
        setUser(data);
      } else {
        setUser(null); // If user data is missing or invalid
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      localStorage.removeItem("token");
      setUser(null);
      console.log("test");
      setError("Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials: any) => {
    try {
      setIsLoading(true);
      const { data } = await api.post("auth/login", credentials);
      localStorage.setItem("token", data.token);
      await fetchUser(); // This will update the user state
      setError(null); // Clear any previous errors
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed";
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
      await fetchUser(); // This will update the user state
      setError(null); // Clear any previous errors
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      isLoading,
      isAuthenticated: !!user,
      error,
      fetchUser, // Add fetchUser to the context value
    }),
    [user, isLoading, error] // Dependencies remain the same since functions are stable
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
