import React from "react";
import { motion } from "framer-motion";
import CourseBreadcrumb from "./CourseBreadcrumb";
import { courseDetails } from "../../data/courseDetails";
import { heroData } from "../../data/home";

const CourseHero = ({ course }) => {
  return (
    <>
      <CourseBreadcrumb courseTitle={course.title} />

      <section className="bg-gradient-to-b from-[#FBFEFE] to-[#E7F6F5] py-4 md:py-20">
        <div className="max-w-8xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-2xl shadow-lg overflow-hidden bg-white"
          >
            {/* Aspect ratio box */}
            <div className="w-full object-contain aspect-[4/3]">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-inter text-[32px] text-text-primary font-bold !leading-normal">
              {course.title
                .split(heroData.courseHighlight)
                .map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index === 0 && (
                      <span className="text-brand-premium">
                        {heroData.courseHighlight}
                      </span>
                    )}
                  </React.Fragment>
                ))}
            </h1>

            <p className="mt-4 text-lg text-text-secondary max-w-xl">
              {course.description}
            </p>
            <p className="mt-4 text-lg text-text-primary max-w-xl">
              {course.instructor.name}
            </p>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600 font-inter border-t pt-6">
              <span className="flex items-center gap-2 bg-bg-card px-3 py-2 rounded-lg text-sm text-text-primary font-normal">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                {course.duration}
              </span>
              <span className="flex items-center gap-2 bg-bg-card px-3 py-2 rounded-lg text-sm text-text-primary font-normal">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                </svg>
                {course.modules_count} মডিউল
              </span>
              <span className="flex items-center gap-2 bg-bg-card px-3 py-2 rounded-lg text-sm text-text-primary font-normal">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                {course.enrollments_count.toLocaleString()}+ শিক্ষার্থী
              </span>
            </div>

            {/* Promo text */}
            {course.promo_text && (
              <div className="flex items-center gap-1 mt-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="#5E6F68"
                >
                  <path d="M10.625 9.16663C10.625 8.82146 10.3452 8.54163 10 8.54163C9.65483 8.54163 9.375 8.82146 9.375 9.16663V14.1666C9.375 14.5118 9.65483 14.7916 10 14.7916C10.3452 14.7916 10.625 14.5118 10.625 14.1666V9.16663Z" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.0013 1.04163C5.05375 1.04163 1.04297 5.05241 1.04297 9.99996C1.04297 14.9475 5.05375 18.9583 10.0013 18.9583C14.9489 18.9583 18.9596 14.9475 18.9596 9.99996C18.9596 5.05241 14.9489 1.04163 10.0013 1.04163ZM2.29297 9.99996C2.29297 5.74277 5.74411 2.29163 10.0013 2.29163C14.2585 2.29163 17.7096 5.74277 17.7096 9.99996C17.7096 14.2571 14.2585 17.7083 10.0013 17.7083C5.74411 17.7083 2.29297 14.2571 2.29297 9.99996Z"
                  />
                  <path d="M10.8346 6.66665C10.8346 7.12688 10.4616 7.49998 10.0013 7.49998C9.54105 7.49998 9.16797 7.12688 9.16797 6.66665C9.16797 6.20641 9.54105 5.83331 10.0013 5.83331C10.4616 5.83331 10.8346 6.20641 10.8346 6.66665Z" />
                </svg>
                <span className="text-base text-text-secondary font-normal ">
                  {course.promo_text}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <section className="py-4 px-4 md:px-0 bg-bg-primary flex items-start md:items-center justify-center gap-0 md:gap-2 text-base md:text-xl text-text-inverse text-center">
        <svg
          className="w-6 h-6 md:w-5 md:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
        <span>{course.note}</span>
      </section>
    </>
  );
};

export default CourseHero;
