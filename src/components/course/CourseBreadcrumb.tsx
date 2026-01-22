import { Link } from "react-router-dom";

const CourseBreadcrumb = ({ courseTitle }) => {
  return (
    <div className="bg-white shadow-sm border-b-2 border-[#DCE5E1] py-4 font-inter text-lg font-normal ">
      <div className="max-w-8xl mx-auto px-4 text-sm text-text-primary">
        <Link
          to="/"
          className="hover:text-[#2F7C74] font-inter text-lg font-normal"
        >
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          to="/courses"
          className="hover:text-[#2F7C74] text-text-primary font-inter text-lg font-normal"
        >
          Courses
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text-secondary  font-inter text-lg font-normal">
          {courseTitle}
        </span>
      </div>
    </div>
  );
};

export default CourseBreadcrumb;
