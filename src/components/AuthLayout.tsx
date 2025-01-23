import { Outlet } from "react-router-dom";
const test = "";
export function AuthLayout({ children, title }: any) {
  return (
    <div className="flex h-screen">
      <div className="relative hidden w-1/2 lg:block">
        <img src={test} alt="Authentication" />
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {title}
            </h2>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
