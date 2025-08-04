import { useState } from "react";
import { useGeneral } from "../hooks";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin"); // default
  const {forgetPassword} = useGeneral()
  const {mutate} = forgetPassword();

  const handleSubmit = async () => {
    mutate({email, role})
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-bold">Parolni tiklash</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select
        className="border p-2 rounded w-64"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Davom etish
      </button>
    </div>
  );
};

export default ForgotPasswordPage;
