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

  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-6xl">📚</div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              কোনো কোর্স খুঁজে পাওয়া যায়নি
            </h3>
            <p className="text-gray-600">
              আপনি এখনো কোনো কোর্সে এনরোল করেননি। নতুন কিছু শিখতে শুরু করুন!
            </p>
          </div>
          <button
            onClick={() => navigate("/courses")}
            className="px-8 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition font-medium"
          >
            কোর্স ব্রাউজ করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">আমার কোর্সসমূহ</h2>
        <button
          onClick={() => navigate("/courses")}
          className="text-brand-primary hover:underline font-medium text-sm flex items-center gap-1"
        >
          আরো কোর্স দেখুন
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div
            key={course.id}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-brand-primary transition-all duration-300 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate(`/student/courses/${course.id}`)}
          >
            {/* Image */}
            <div className="relative overflow-hidden bg-gray-100 aspect-[16/9]">
              <img
                src={course.image || course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Progress Badge */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                <span className="text-xs font-bold text-brand-primary">
                  {course.progress_percent}%
                </span>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <span className="font-medium">চালিয়ে যান</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Title */}
              <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-brand-primary transition-colors min-h-[3rem]">
                {course.title}
              </h3>

              {/* Module Progress */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  মডিউল: <span className="font-semibold text-gray-800">{course.completed_modules}</span> / {course.total_modules}
                </span>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <span>সম্পন্ন</span>
                  <span className="font-semibold">{course.progress_percent}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${course.progress_percent}%` }}
                  />
                </div>
              </div>

              {/* Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/student/courses/${course.id}`);
                }}
                className="w-full py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition font-medium flex items-center justify-center gap-2 group-hover:shadow-lg"
              >
                <span>কোর্সে যান</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;