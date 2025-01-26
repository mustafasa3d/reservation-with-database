"use client";

import CustomInput from "../CustomInput";
import InstructionsPopup from "./InstructionsPopup";
import Loading from "../Loading";
import { login } from "@/utils/api/commanService";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [openInstructions, setOpenInstructions] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter() as ReturnType<typeof useRouter>;

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { username, password };
    login(data, setLoading, setError, router);
  };

  if (loading) return <Loading />;

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center h-full lg:h-[calc(100%-100px)] bg-gradient-to-r from-gray-900 to-gray-700 mt-10 rounded-3xl flex-col gap-y-5">
        <h2 className="text-4xl font-bold text-white">Reservation System</h2>
        <button type="button" onClick={() => setOpenInstructions((prev)=>!prev)} className="text-4xl font-bold text-white bg-red-500 p-5 rounded-2xl hover:bg-red-700 duration-300">Please Click Here To See Important Instructions</button>
        <form
          onSubmit={(e) => {
            handelSubmit(e);
          }}
          className="p-8 bg-white shadow-2xl rounded-lg max-w-md w-full"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h1>

          <CustomInput
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="User Name"
            placeholder="Username"
            className="text-gray-700"
          />
          <CustomInput
            type="password"
            name="password"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="text-gray-700"
          />

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <InstructionsPopup open={openInstructions} setOpen={setOpenInstructions} />
    </div>
  );
};

export default LoginForm;
