import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import EditResume from "./pages/resume/index.tsx";
import ResumePreview from "./pages/resume/components/ResumePreview.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ResumeInfoContext } from "./context/ResumeInfoContext.tsx";
import MyResume from "./pages/MyResume.tsx";
import JobVacancies from "./pages/JobVacancies.tsx";
import Login from "./pages/Login.tsx";
import Registration from "./pages/Registration.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/resume/edit",
    element: <EditResume />,
  },
  {
    path: "/resume",
    element: <MyResume />,
  },
  {
    path: "/vacancy",
    element: <JobVacancies />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);

function AppWrapper() {
  const [resumeInfo, setResumeInfo] = useState<any>([]);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ResumeInfoContext.Provider>
  );
}
