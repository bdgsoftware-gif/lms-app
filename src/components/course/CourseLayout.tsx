import CourseContentLeft from "./CourseContentLeft";
import CourseEnrollCard from "./CourseEnrollCard";
import CourseGuidelineSection from "./CourseGuidelineSection";

const CourseLayout = ({ course }) => {
  if (!course) return null;
  if (course.has_demo_video && course.demo_video_url) {
    return (
      <div className="bg-gray-50 pb-20">
        {/* Video Section */}
        <section className="pt-10 pb-6">
          <div className="max-w-8xl mx-auto px-4">
            <div className="mb-4 flex items-center gap-3 text-gray-600 text-base font-semibold">
              <span className="bg-[#EAF2F1] rounded-lg p-1.5 border border-[#C8DAD8] inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 17 14"
                  fill="none"
                >
                  <path
                    d="M2.5 10H10.8333L7.95833 6.25L6.04167 8.75L4.75 7.08333L2.5 10ZM1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8438C0.163194 12.5174 0 12.125 0 11.6667V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H11.6667C12.125 0 12.5174 0.163194 12.8438 0.489583C13.1701 0.815972 13.3333 1.20833 13.3333 1.66667V5.41667L16.6667 2.08333V11.25L13.3333 7.91667V11.6667C13.3333 12.125 13.1701 12.5174 12.8438 12.8438C12.5174 13.1701 12.125 13.3333 11.6667 13.3333H1.66667ZM1.66667 11.6667H11.6667V1.66667H1.66667V11.6667Z"
                    fill="#235D57"
                  />
                </svg>
              </span>{" "}
              {course.title} - ভিডিও গাইডলাইন
            </div>
            <div className="px-5 py-8 bg-[#F6F8F5] rounded-2xl shadow-lg">
              <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={course.demo_video_url}
                  title="Course Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="max-w-5xl mx-auto bg-[#EAF2F1] p-2 rounded-2xl mt-6 flex justify-center items-center border border-[#C8DAD8] gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3.33398 3.33373C3.33391 3.09912 3.39575 2.86865 3.51324 2.66559C3.63073 2.46252 3.79972 2.29406 4.00315 2.17719C4.20658 2.06033 4.43724 1.99921 4.67184 2.00001C4.90645 2.0008 5.13669 2.06349 5.33932 2.18173L13.3373 6.84706C13.5392 6.96418 13.7067 7.13223 13.8233 7.3344C13.9398 7.53657 14.0013 7.76579 14.0015 7.99915C14.0017 8.23251 13.9406 8.46184 13.8244 8.66422C13.7082 8.86659 13.541 9.03493 13.3393 9.1524L5.33932 13.8191C5.13669 13.9373 4.90645 14 4.67184 14.0008C4.43724 14.0016 4.20658 13.9405 4.00315 13.8236C3.79972 13.7067 3.63073 13.5383 3.51324 13.3352C3.39575 13.1321 3.33391 12.9017 3.33398 12.6671V3.33373Z"
                    fill="#235D57"
                    stroke="#235D57"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-[#235D57] text-center text-base font-medium">
                  Play when you're ready.
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* Content Section */}
        <CourseGuidelineSection />
      </div>
    );
  }
  return (
    <section className="py-4 md:py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4 grid lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 md:pr-12">
          <CourseContentLeft course={course} />
        </div>
        <div className="hidden lg:block">
          <CourseEnrollCard
            courseId={course.id}
            price={Number(course.price)}
            offerPrice={Number(course.offerPrice)}
          />
        </div>
      </div>
    </section>
  );
};

export default CourseLayout;
