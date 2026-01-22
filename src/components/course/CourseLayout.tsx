import CourseContentLeft from "./CourseContentLeft";
import CourseEnrollCard from "./CourseEnrollCard";
// import { courseDetails } from "../../data/courseDetails";
const CourseLayout = ({ course }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4 grid lg:grid-cols-3 gap-20">
        {/* Left */}
        <div className="lg:col-span-2 md-pr-12">
          <CourseContentLeft course={course} />
        </div>

        {/* Right */}
        <div className="hidden lg:block">
          <CourseEnrollCard courseId={course.id} price={course.price} />
        </div>
      </div>
    </section>
  );
};

export default CourseLayout;
