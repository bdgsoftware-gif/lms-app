import { courseDetails } from "../../data/courseDetails";
import { FaCheck } from "react-icons/fa";

const CourseContentLeft = ({ course }) => {
  return (
    <div className="space-y-10">
      {/* Instructor */}
      <section>
        <h2 className="text-2xl font-semibold font-inter text-text-primary mb-4 my-4">
          কোর্স ইন্সট্রাক্টর
        </h2>

        <div className="flex gap-4 items-start border-y border-text-secondary/50 p-5">
          {/* Instructor Avatar / Initials */}
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {course.instructor.avatar ? (
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-lg font-medium text-gray-700">
                {course.instructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
          </div>

          <div>
            <p className="font-medium text-lg font-inter text-text-primary">
              {course.instructor.name}
            </p>
            <p className="mt-3 text-base  text-text-secondary font-normal max-w-2xl">
              {course.instructor.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section>
        <h2 className="text-2xl font-semibold font-inter text-text-primary mb-4">
          কোর্সটি যেভাবে সাজানো হয়েছে
        </h2>

        <div className="bg-[#173425] p-6 rounded-xl">
          <div className="grid md:grid-cols-2 gap-6">
            {courseDetails.courseOutcomes.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-button-primary text-white font-bold">
                  {/* Replace with React icon */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain aspect-square"
                  />
                </div>

                {/* Text */}
                <div>
                  <h4 className="font-semibold font-inter text-lg text-text-inverse">
                    {item.title}
                  </h4>
                  <p className="text-base font-inter text-text-secondary mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Structure */}
      <section>
        <h2 className="text-2xl font-semibold font-inter text-text-primary mb-4">
          কোর্সটি করে যা শিখবেন
        </h2>

        <ol className="space-y-3">
          {courseDetails.structure.map((item, index) => (
            <li
              key={index}
              className="flex gap-4 items-center bg-[#F9F9F9] p-4 rounded"
            >
              <span className="font-semibold text-text-secondary font-inter">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default CourseContentLeft;
