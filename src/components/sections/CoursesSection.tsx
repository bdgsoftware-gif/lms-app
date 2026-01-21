import { motion } from "framer-motion";
import { homeCourses } from "../../data/courses";

const CoursesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-14">
          <div className="font-inter">
            <h2 className="text-[32px] md:text-[42px] leading-relaxed text-text-primary font-normal">আমাদের জনপ্রিয় কোর্সসমূহ</h2>
            <p className="mt-6 text-lg text-text-secondary max-w-xl">
              সকল স্তরের জন্য বিশেষভাবে ডিজাইন করা কোর্স
            </p>
          </div>

          <button className="mt-6 md:mt-0 px-6 py-3.5 bg-button-primary text-white font-inter rounded-3xl hover:bg-[#27665f] transition">
            আরও কোর্স দেখুন
          </button>
        </div>

        {/* Courses */}
        <div className="space-y-20">
          {homeCourses.map((course, index) => {
            const isImageRight = index % 2 === 1;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  isImageRight ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={`w-full bg-[#EAF2F1] p-4 rounded-3xl shadow-lg overflow-hidden ${
                    isImageRight ? "md:order-2" : ""
                  }`}
                >
                  <div className="w-full aspect-[5/3] overflow-hidden rounded-2xl">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <div className={`${isImageRight ? "md:order-1" : ""}`}>
                  <h3 className="text-3xl font-medium text-gray-900">
                    {course.title}
                  </h3>

                  <p className="mt-4 text-lg text-[#5E6F68] font-normal leading-relaxed word-spacing-wide">
                    {course.description}
                  </p>

                  {/* Meta */}
                  <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600 font-inter border-t pt-6">
                    <span className="flex items-center gap-2 bg-[#EAF2F1] px-3 py-2 rounded-lg">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-2 bg-[#EAF2F1] px-3 py-2 rounded-lg">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                      </svg>
                      {course.modules} মডিউল
                    </span>
                    <span className="flex items-center gap-2 bg-[#EAF2F1] px-3 py-2 rounded-lg">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                      </svg>
                      {course.students.toLocaleString()}+ শিক্ষার্থী
                    </span>
                  </div>

                  <button className="mt-8 px-6 py-3 bg-[#2F7C74] text-white rounded-lg hover:bg-[#266964] transition-all duration-300 hover:shadow-lg flex items-center gap-2">
                    কোর্সের বিস্তারিত দেখুন
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
