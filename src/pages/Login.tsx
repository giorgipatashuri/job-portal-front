import { useState } from "react";
import Registration from "./Registration";

const Login = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const openRegistrationModal = () => setIsRegistrationOpen(true);
  const closeRegistrationModal = () => setIsRegistrationOpen(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">შესვლა</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">ელ. ფოსტა</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">პასვორდი</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button className="w-full text-white py-2 rounded bg-emerald-600 hover:bg-emerald-500">
            შესვლა
          </button>
        </form>
        <p className="mt-4 text-center">
          არ გაქვთ ექაუნთი?{" "}
          <button
            onClick={openRegistrationModal}
            className="text-emerald-500 underline"
          >
            დარეგისტრირდი
          </button>
        </p>
      </div>

      {isRegistrationOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={closeRegistrationModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <Registration />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
