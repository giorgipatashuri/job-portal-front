import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import EditResume from "./pages/resume/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ResumeInfoProvider } from "./context/ResumeInfoContext.tsx";
import JobVacancies from "./pages/JobVacancies.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import FinalPreview from "./pages/FinalPreview.tsx";
import Register from "./pages/auth/Register.tsx";
import App from "./App.tsx";
import CompanyRegister from "./pages/company/Register.tsx";
import CompanyLogin from "./pages/company/Login.tsx";
import CompanyDashboardLayout from "./pages/company/dashboard/CompanyDashboardLayout.tsx";
import ApplicantsList from "./pages/company/components/ApplicantsList.tsx";
import JobsList from "./pages/company/components/JobsList.tsx";
import Login from "./pages/auth/Login.tsx";
import { JobDetailsPage } from "./pages/job/JobDetailsPage.tsx";
import { JobListingPage } from "./pages/job/JobListingPage.tsx";
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
    path: "/jobs",
    element: <JobListingPage />,
  },
  {
    path: "/jobs/:id",
    element: <JobDetailsPage />,
  },
  {
    path: "/user/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/user/register",
    element: <Register />,
  },
  {
    path: "/company/login",
    element: <CompanyLogin />,
  },
  {
    path: "/company/register",
    element: <CompanyRegister />,
  },
  {
    path: "/company/dashboard",
    element: <CompanyDashboardLayout />,
    children: [
      { path: "/company/dashboard/jobs", element: <JobsList /> },
      { path: "/company/dashboard/applicants", element: <ApplicantsList /> },
      { path: "/company/dashboard", element: <JobsList /> }, // Default dashboard route
    ],
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
