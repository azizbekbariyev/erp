import { useGeneral } from "../../hooks";
import { User, Mail, Phone, MapPin, KeyRound } from "lucide-react";
import { useTeacherLayOut } from "../../hooks/useTeacherLayOut";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { data } = useGeneral();
  const { groupTeacher } = useTeacherLayOut();
  const navigate = useNavigate();

  if (!data || !groupTeacher) {
    return <p>Loading...</p>;
  }

  const handleForgotPassword = () => {
    const confirm = window.confirm("Parolingizni yangilamoqchimisiz?");
    if (confirm) {
      navigate("/forget-password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {data.first_name} {data.last_name}
              </h1>
              <p className="text-gray-600 font-medium">
                {data.role === "main teacher" ? "Main Teacher" : "Teacher"}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-500">⏱ 0 years experience</span>
                <span className="text-sm text-gray-500">⭐ 4.8 rating</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{data.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{data.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>
                {data.branches.map((branch: any, index: number) =>
                  index === data.branches.length - 1 ? branch.name : branch.name + ", "
                )}
              </span>
            </div>
          </div>

          {/* Forgot Password Button */}
          <div className="text-right">
            <button
              onClick={handleForgotPassword}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
            >
              <KeyRound className="w-4 h-4" />
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
