// pages/VerifyCodePage.tsx
import { useState } from "react";
import { useGeneral } from "../hooks";

const VerifyCodePage = () => {
  const [code, setCode] = useState("");
  const {confirmOtp} = useGeneral()
  const {mutate} = confirmOtp()
  const handleVerify = async () => {
    mutate({otp:Number(code)})
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-xl font-bold text-center mb-4">Kodni kiriting</h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          Kod sizga email orqali yuborilgan
        </p>
        <input
          type="text"
          placeholder="Masalan: 123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleVerify}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
        >
          Tasdiqlash
        </button>
      </div>
    </div>
  );
};

export default VerifyCodePage;
