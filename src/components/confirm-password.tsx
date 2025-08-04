// pages/ResetPasswordPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("resetToken");

  const handleReset = async () => {
    if (password !== confirm) return alert("Parollar mos emas");

    try {
      await axios.post("/api/reset-password", {
        password,
        token,
      });
      localStorage.removeItem("resetToken");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetRole");
      navigate("/login");
    } catch (error) {
      alert("Xatolik yuz berdi");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-bold">Yangi parolni kiriting</h2>
      <input
        type="password"
        placeholder="Yangi parol"
        className="border p-2 rounded w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Parolni tasdiqlang"
        className="border p-2 rounded w-64"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleReset}
      >
        Parolni yangilash
      </button>
    </div>
  );
};

export default ResetPasswordPage;
