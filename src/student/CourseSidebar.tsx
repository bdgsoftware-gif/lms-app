import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
interface Props {
  courseTitle: string;
  modules: any[];
  activeLessonId: number;
  onLessonSelect: (lessonId: number) => void;
}

const CourseSidebar = ({ modules, activeLessonId, onLessonSelect }: Props) => {
  return (
    <aside className="w-72 sm:w-80 h-full bg-white border-r overflow-y-auto flex flex-col">
      {/* Course Header */}
      <div className="p-4 border-b bg-gradient-to-b from-brand-primary to-brand-secondary text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="C M Moin Academy Logo" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Content Header */}
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold text-sm text-gray-700">কোর্স কনটেন্ট</h3>
      </div>

      {/* Modules & Lessons */}
      <div className="flex-1 overflow-y-auto">
        {modules.map((module, moduleIndex) => (
          <div key={module.id} className="border-b last:border-b-0">
            <div className="p-4 bg-gray-50">
              <h4 className="text-sm font-semibold text-gray-800">
                মডিউল {moduleIndex + 1}: {module.title}
              </h4>
            </div>

            <ul className="py-2">
              {module.lessons.map((lesson: any, lessonIndex: number) => {
                const isActive = lesson.id === activeLessonId;
                const isLocked = lesson.is_locked;

                return (
                  <li
                    key={lesson.id}
                    onClick={() => !isLocked && onLessonSelect(lesson.id)}
                    className={`px-4 py-3 cursor-pointer text-sm flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-brand-primary text-white border-l-4 border-brand-secondary"
                        : isLocked
                          ? "text-gray-400 cursor-not-allowed bg-gray-50"
                          : "hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          isActive
                            ? "bg-white text-brand-primary"
                            : isLocked
                              ? "bg-gray-300 text-gray-500"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {lessonIndex + 1}
                      </span>
                      <span className="truncate">{lesson.title}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {lesson.is_free && !isActive && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          ফ্রি
                        </span>
                      )}
                      {lesson.is_completed && (
                        <span
                          className={isActive ? "text-white" : "text-green-500"}
                        >
                          ✓
                        </span>
                      )}
                      {isLocked && (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default CourseSidebar;
