import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  progress_percent: number;
  completed_modules: number;
  total_modules: number;
  thumbnail: string;
  image: string;
}

interface Props {
  courses: Course[];
}

const StudentCourses = ({ courses }: Props) => {
  const navigate = useNavigate();

  if (!courses.length) {
    return <p className="text-gray-600">আপনি এখনো কোনো কোর্সে এনরোল করেননি।</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">আমার কোর্সসমূহ</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl border overflow-hidden"
          >
            <img
              src={course.image}
              className="w-full object-contain aspect-[4/3]"
            />

            <div className="p-4">
              <h3 className="font-semibold">{course.title}</h3>

              <div className="mt-3 text-sm text-gray-600">
                মডিউল: {course.completed_modules} / {course.total_modules}
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-brand-primary rounded"
                  style={{
                    width: `${course.progress_percent}%`,
                  }}
                />
              </div>

              <button
                onClick={() => navigate(`/student/courses/${course.id}`)}
                className="mt-4 w-full py-2 bg-brand-primary text-white rounded"
              >
                কোর্সে যান
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
