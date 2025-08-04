import { useNavigate } from "react-router-dom";
import { useGeneral } from "../../hooks";

const Profile = () => {
  const { data } = useGeneral();
  const navigate = useNavigate();

  if (!data) {
    return (
      <h1 className="text-center text-xl font-medium mt-10">Loading...</h1>
    );
  }

  const handleForgotPassword = () => {
    const confirm = window.confirm("Parolingizni yangilamoqchimisiz?");
    if (confirm) {
      navigate("/forget-password");
    }
  };

  return (
    <div className="max-w-4xl p-6 bg-white shadow-lg rounded-2xl mt-6 ml-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Personal Information
      </h1>

      <div className="flex gap-6 items-center mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
          <img
            src={data.avatar_url || "/default-avatar.png"}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/default-avatar.png";
            }}
          />
        </div>
        <div>
          <h2 className="text-lg text-gray-700">
            <strong>First Name:</strong> {data.first_name}
          </h2>
          <h2 className="text-lg text-gray-700">
            <strong>Last Name:</strong> {data.last_name}
          </h2>
          <h2 className="text-lg text-gray-700">
            <strong>Phone:</strong> {data.phone}
          </h2>
          <h2 className="text-lg text-gray-700">
            <strong>Email:</strong> {data.email}
          </h2>
        </div>
      </div>

      {data.branches && (
        <div className="mb-6">
          <h2 className="text-md font-semibold text-gray-800">Branch Info</h2>
          <p>
            <strong>Name:</strong> {data.branches.name}
          </p>
          <p>
            <strong>Address:</strong> {data.branches.address}
          </p>
        </div>
      )}

      <div className="mb-4 text-sm text-gray-600">
        <p>
          <strong>Created at:</strong> {data.created_at}
        </p>
        <p>
          <strong>Updated at:</strong> {data.updated_at}
        </p>
      </div>

      <div className="text-right">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default Profile;
