import type { GroupLessonsType } from "@types";
import LessonsList from "../lessons-list";
import { useMemo } from "react";

const GroupLessons = ({ lessons }: GroupLessonsType) => {
  // Use useMemo to optimize calculations - only recalculate when lessons change
  const lessonStats = useMemo(() => {
    const stats = lessons.reduce((acc, lesson) => {
      switch (lesson.status) {
        case "cancelled":
          acc.canceled++;
          break;
        case "new":
          acc.active++;
          break;
        case "completed":
          acc.completed++;
          break;
        case "progress":
          acc.progress++;
          break;
        default:
          break;
      }
      return acc;
    }, {
      canceled: 0,
      active: 0,
      completed: 0,
      progress: 0,
      total: lessons.length
    });

    return stats;
  }, [lessons]);

  // Calculate completion percentage
  const completionPercentage = lessonStats.total > 0 
    ? Math.round((lessonStats.completed / lessonStats.total) * 100) 
    : 0;

  const getStatusColor = (status: string, count: number) => {
    if (count === 0) return "text-gray-400";
    
    switch (status) {
      case "completed":
        return "text-green-600 font-semibold";
      case "canceled":
        return "text-red-600 font-semibold";
      case "progress":
        return "text-blue-600 font-semibold";
      case "new":
        return "text-yellow-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      {/* Header with Statistics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-800">Lessons</h3>
          {lessonStats.total > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">{completionPercentage}%</span>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1">
            <span className="text-gray-500">All:</span>
            <span className="font-semibold text-gray-700">{lessonStats.total}</span>
          </span>
          
          <span className="flex items-center gap-1">
            <span className="text-gray-500">Completed:</span>
            <span className={getStatusColor("completed", lessonStats.completed)}>
              {lessonStats.completed}
            </span>
          </span>
          
          <span className="flex items-center gap-1">
            <span className="text-gray-500">In Progress:</span>
            <span className={getStatusColor("progress", lessonStats.progress)}>
              {lessonStats.progress}
            </span>
          </span>
          
          <span className="flex items-center gap-1">
            <span className="text-gray-500">New:</span>
            <span className={getStatusColor("new", lessonStats.active)}>
              {lessonStats.active}
            </span>
          </span>
          
          <span className="flex items-center gap-1">
            <span className="text-gray-500">Canceled:</span>
            <span className={getStatusColor("canceled", lessonStats.canceled)}>
              {lessonStats.canceled}
            </span>
          </span>
        </div>
      </div>

      {/* Quick Stats Cards (Optional - for better visual representation) */}
      {lessonStats.total > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-gray-700">{lessonStats.total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-green-600">{lessonStats.completed}</div>
            <div className="text-xs text-green-600">Completed</div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-blue-600">{lessonStats.progress}</div>
            <div className="text-xs text-blue-600">In Progress</div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-yellow-600">{lessonStats.active}</div>
            <div className="text-xs text-yellow-600">New</div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-red-600">{lessonStats.canceled}</div>
            <div className="text-xs text-red-600">Canceled</div>
          </div>
        </div>
      )}

      {/* Lessons List Component */}
      <LessonsList lessons={lessons} />
      
      {/* Empty State */}
      {lessonStats.total === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📚</div>
          <p>No lessons available for this group yet.</p>
        </div>
      )}
    </div>
  );
};

export default GroupLessons;