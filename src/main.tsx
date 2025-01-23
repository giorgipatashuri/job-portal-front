import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import EditResume from "./pages/resume/index.tsx";
import ResumePreview from "./pages/resume/components/ResumePreview.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ResumeInfoContext,
  ResumeInfoProvider,
} from "./context/ResumeInfoContext.tsx";
import JobVacancies from "./pages/JobVacancies.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthLayout } from "./components/AuthLayout.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Registration.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import FinalPreview from "./pages/FinalPreview.tsx";

const router = createBrowserRouter([
  {
    path: "/resume/:id",
    element: <FinalPreview />,
  },
  {
    path: "/resume/edit",
    element: <EditResume />,
  },
  {
    path: "/vacancy",
    element: <JobVacancies />,
  },

  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);

function AppWrapper() {
  return (
    <ResumeInfoProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </ResumeInfoProvider>
  );
}
