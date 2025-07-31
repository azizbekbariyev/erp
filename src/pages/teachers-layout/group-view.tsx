import { useState } from "react";
import {
  ArrowLeft,
  Play,
  Users,
  BookOpen,
  Calendar,
  Star,
  Phone,
  Mail,
} from "lucide-react";

const GroupDetailView = () => {
  const [activeTab, setActiveTab] = useState("students");

  // Mock data based on your Frontend Bootcamp #12
  const groupData = {
    id: 12,
    name: "Frontend Bootcamp #12",
    subject: "Frontend Development",
    level: "Intermediate",
    room: "A-201",
    price: "1,200,000 UZS",
    description: "Frontend Development Bootcamp",
    students: {
      enrolled: 18,
      total: 20,
    },
    progress: {
      percentage: 75,
      startDate: "15.10.2024",
      endDate: "15.02.2025",
    },
    lessons: {
      completed: 36,
      total: 48,
    },
    schedule: "Mon, Wed, Fri",
  };

  const studentsData = [
    {
      id: 1,
      name: "Alisher Karimov",
      email: "alisher@gmail.com",
      phone: "+998 90 111 22 33",
      progress: 85,
      attendance: 92,
      rating: 4.5,
      status: "Active",
      avatar: "A",
    },
    {
      id: 2,
      name: "Mohira Toshmatova",
      email: "mohira@gmail.com",
      phone: "+998 91 222 33 44",
      progress: 78,
      attendance: 88,
      rating: 4.2,
      status: "Active",
      avatar: "M",
    },
    {
      id: 3,
      name: "Jasur Abdullayev",
      email: "jasur@gmail.com",
      phone: "+998 93 333 44 55",
      progress: 92,
      attendance: 95,
      rating: 4.8,
      status: "Active",
      avatar: "J",
    },
    {
      id: 4,
      name: "Nigora Yunusova",
      email: "nigora@gmail.com",
      phone: "+998 94 444 55 66",
      progress: 70,
      attendance: 80,
      rating: 3.9,
      status: "Warning",
      avatar: "N",
    },
  ];

  const teachersData = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+998 90 123 45 67",
      subject: "Frontend Development",
      experience: "5 years",
      rating: 4.9,
      avatar: "J",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+998 91 234 56 78",
      subject: "JavaScript",
      experience: "3 years",
      rating: 4.7,
      avatar: "S",
    },
  ];

  const lessonsData = [
    {
      id: 1,
      title: "HTML Fundamentals",
      duration: "2 hours",
      completed: true,
      date: "2024-10-15",
      type: "Theory",
    },
    {
      id: 2,
      title: "CSS Basics",
      duration: "3 hours",
      completed: true,
      date: "2024-10-17",
      type: "Practice",
    },
    {
      id: 3,
      title: "JavaScript Introduction",
      duration: "4 hours",
      completed: false,
      date: "2024-10-20",
      type: "Theory",
    },
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Warning":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: any) => {
    if (progress >= 85) return "bg-green-500";
    if (progress >= 70) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const renderStars = (rating: any) => {
    return (
      <div className="flex items-center">
        <Star className="w-4 h-4 fill-current text-yellow-400" />
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button className="flex items-center text-gray-600 hover:text-gray-800 mr-4">
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {groupData.name}
              </h1>
              <p className="text-gray-600">{groupData.subject}</p>
            </div>
          </div>
          <button className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Play className="w-5 h-5 mr-2" />
            Start Lesson
          </button>
        </div>

        {/* Group Info Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {groupData.name}
              </h2>
              <span className="inline-flex px-3 py-1 text-sm font-medium rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                {groupData.level}
              </span>
              <div className="mt-2 text-sm text-gray-600">
                <p>Room: {groupData.room}</p>
                <p>Price: {groupData.price}</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-gray-600 mr-1" />
                <span className="text-sm text-gray-500">Students</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {groupData.students.enrolled} / {groupData.students.total}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-5 h-5 bg-green-500 rounded-full mr-1"></div>
                <span className="text-sm text-gray-500">Progress %</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {groupData.progress.percentage}%
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-gray-600 mr-1" />
                <span className="text-sm text-gray-500">Lessons</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {groupData.lessons.completed} / {groupData.lessons.total}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-gray-600 mr-1" />
                <span className="text-sm text-gray-500">Schedule</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {groupData.schedule}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Total Progress:</span>
              <span className="text-sm text-gray-600">
                {groupData.progress.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${groupData.progress.percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{groupData.progress.startDate}</span>
              <span>{groupData.progress.endDate}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description:
            </h3>
            <p className="text-gray-600">{groupData.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("students")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "students"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Students ({studentsData.length})
              </button>
              <button
                onClick={() => setActiveTab("teachers")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "teachers"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Teachers ({teachersData.length})
              </button>
              <button
                onClick={() => setActiveTab("lessons")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "lessons"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Lessons ({lessonsData.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "students" && (
              <div className="w-full">
                <table className="w-full min-w-full table-auto">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="pb-3 pr-4">Student</th>
                      <th className="pb-3 pr-4">Phone</th>
                      <th className="pb-3 pr-4">Progress</th>
                      <th className="pb-3 pr-4">Attendance</th>
                      <th className="pb-3 pr-4">Rating</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {studentsData.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="py-4 pr-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium mr-3">
                              {student.avatar}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {student.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-1" />
                            {student.phone}
                          </div>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                              <div
                                className={`h-2 rounded-full ${getProgressColor(
                                  student.progress
                                )}`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 min-w-[35px]">
                              {student.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="flex items-center">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded min-w-[45px] text-center ${
                                student.attendance >= 90
                                  ? "bg-green-100 text-green-800"
                                  : student.attendance >= 80
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {student.attendance}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 pr-4">
                          {renderStars(student.rating)}
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              student.status
                            )}`}
                          >
                            ● {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "teachers" && (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="pb-3">Teacher</th>
                      <th className="pb-3">Contact</th>
                      <th className="pb-3">Subject</th>
                      <th className="pb-3">Experience</th>
                      <th className="pb-3">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teachersData.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                              {teacher.avatar}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {teacher.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="w-4 h-4 mr-1" />
                              {teacher.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-1" />
                              {teacher.phone}
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-900">
                            {teacher.subject}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-600">
                            {teacher.experience}
                          </span>
                        </td>
                        <td className="py-4">{renderStars(teacher.rating)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "lessons" && (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="pb-3">Lesson</th>
                      <th className="pb-3">Duration</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {lessonsData.map((lesson) => (
                      <tr key={lesson.id} className="hover:bg-gray-50">
                        <td className="py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {lesson.title}
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-600">
                            {lesson.duration}
                          </span>
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                              lesson.type === "Theory"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {lesson.type}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-600">
                            {lesson.date}
                          </span>
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              lesson.completed
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {lesson.completed ? "✓ Completed" : "○ Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium">
              1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailView;
