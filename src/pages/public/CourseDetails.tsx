import CourseHero from "../../components/course/CourseHero";
import CourseLayout from "../../components/course/CourseLayout";
// import MoreCoursesSlider from "../../components/course/MoreCoursesSlider";
import FAQSection from "../../components/sections/FAQSection";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCourseDetails } from "../../api/course.api";

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetchCourseDetails(slug).then((data) => {
      setCourse(data);
    });
  }, [slug]);

  if (!course) {
    return (
      <section className="py-4 md:py-20 bg-white">
        <div className="max-w-8xl mx-auto px-4">
          <p className="text-center text-gray-500">ডেটা লোড হচ্ছে...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <CourseHero course={course} />
      <CourseLayout course={course} />
      {/* <MoreCoursesSlider /> */}
      <FAQSection />
    </>
  );
};

export default CourseDetails;
