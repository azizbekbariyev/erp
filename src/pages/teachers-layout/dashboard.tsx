// import { Button, Table } from "antd"
// import { useNavigate } from "react-router-dom";
// import { Service } from "../../service/general.service";

// const Dashboard = () => {
//   console.log(data);
//   return (
//     <div>
//       <div>
//         Salom
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useGeneral, useTeacher } from "../../hooks";
import { User, Mail, Phone, MapPin } from "lucide-react";

const Dashboard = () => {
  const { data } = useGeneral();
  const { groupTeacher } = useTeacher();
  if (!data || !groupTeacher) {
    return <p>Loading...</p>;
  }
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
                {data.role == "main teacher" ? "Main Teacher" : "Teacher"}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-500">
                  ⏱ 0 years experience
                </span>
                <span className="text-sm text-gray-500">⭐ 4.8 rating</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
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
              <span>{data.branches.map((branch: any) => branch.name)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
