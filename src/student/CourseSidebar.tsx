import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

interface Props {
  modules: any[];
  activeLessonId: number;
  onLessonSelect: (lesson: any) => void;
}

const CourseSidebar = ({ modules, activeLessonId, onLessonSelect }: Props) => {
  return (
    <aside className="w-80 bg-white border-r overflow-y-auto">
      {/* Logo */}
      <NavLink to="/" className="flex items-center justify-center">
        <img src={Logo} alt="C M Moin Academy Logo" className="h-10 w-auto" />
      </NavLink>
      {modules.map((module) => (
        <div key={module.id} className="p-4">
          <h3 className="font-semibold text-sm mb-2">{module.title}</h3>

          <ul className="space-y-1">
            {module.lessons.map((lesson) => (
              <li
                key={lesson.id}
                onClick={() => !lesson.is_locked && onLessonSelect(lesson)}
                className={`px-3 py-2 rounded cursor-pointer text-sm flex justify-between ${
                  lesson.id === activeLessonId
                    ? "bg-brand-primary text-white"
                    : lesson.is_locked
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                }`}
              >
                <span>{lesson.title}</span>
                {lesson.is_completed && <span>✔</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default CourseSidebar;
