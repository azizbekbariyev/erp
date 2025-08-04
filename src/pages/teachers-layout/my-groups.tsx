import { useEffect, useState } from "react";
import { Search, Users, BookOpen, Calendar } from "lucide-react";
import { TeacherSerivce } from "../../service/teachers.service";
import { useNavigate } from "react-router-dom";
import { useTeacherLayOut } from "../../hooks/useTeacherLayOut";

const MyGroup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [levelFilter, setLevelFilter] = useState("All Levels");

  const navigate = useNavigate();

  // Get status badge color
  const getStatusBadgeColor = (status: any) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Finishing":
        return "bg-yellow-100 text-yellow-800";
      case "Starting":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: any) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const { groupTeacher } = useTeacherLayOut();
  const [studentsData, setStudentsData] = useState<any[]>([]);

  //   const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!groupTeacher?.data) return;
      //   setLoading(true);
      try {
        const allStudents = await Promise.all(
          groupTeacher.data.map(async (group: any) => {
            const res = await TeacherSerivce.getStudentGroups(group.group.id);
            return res.data;
          })
        );
        setStudentsData(allStudents.flat());
      } catch (error) {}
    };

    fetchStudents();
  }, [groupTeacher]);
  console.log(groupTeacher);

  const [activeGroup, setActiveGroups] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [completedGroup, setCompletedGroup] = useState(0);

  useEffect(() => {
    if (!studentsData || studentsData.length === 0) return;

    const activeGroups = studentsData.filter(
      (groupData: any) => groupData.group?.status === "new"
    ).length;

    const finishGroup = studentsData.filter(
      (groupData: any) => groupData.group?.status === "completed"
    ).length;

    const allStudents = studentsData.reduce((acc: number, groupData: any) => {
      return acc + (groupData.groupStudents?.length || 0);
    }, 0);

    setActiveGroups(activeGroups);
    setCompletedGroup(finishGroup);
    setActiveStudents(allStudents);
    console.log(studentsData);
    console.log(allStudents);
    console.log(activeGroups);
    console.log(finishGroup);
  }, [studentsData]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Groups</h1>
          <p className="text-gray-600">All active and finished groups</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-gray-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Total Groups</p>
                <p className="text-2xl font-bold text-gray-900">
                  {groupTeacher?.data.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm text-gray-500">Active Groups</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeGroup}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-gray-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeStudents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm text-gray-500">Finishing Groups</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedGroup}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by group name or course..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Finishing</option>
              <option>Starting</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        {/* Groups Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentsData.map((group) => (
                  <tr
                    key={group.id}
                    className="hover:cursor-pointer"
                    onClick={() =>
                      navigate(`/teacher/my-groups/${group.group.id}`)
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {group.group.course.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {group.group.course.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">
                          {group.groupStudents.length}/
                          {group.group.course.duration}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(
                              group.progress
                            )}`}
                            style={{ width: `${group.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {group.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span>
                            {group.group.course.lessons_in_a_week == 5
                              ? "5 days"
                              : "7 days"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(
                          group.group.status == "new" ? "Active" : "Inactive"
                        )}`}
                      >
                        {group.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{group.group.start_date}</div>
                      <div className="text-xs">to {group.group.end_date}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {studentsData.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              No groups found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGroup;
