import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../../api/course.api";
import { ArrowRight, PlayCircle, Star } from "lucide-react";

interface Course {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: string;
  is_paid: boolean;
  level: string;
  category: { name: string };
}

const CourseGrid: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center animate-pulse text-brand-primary">
        Loading Courses...
      </div>
    );

  return (
    <section className="bg-bg-light py-20 px-4 sm:px-6">
      <div className="max-w-[104rem] mx-auto">
        {" "}
        {/* Using your 10xl maxWidth */}
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-bengali font-bold text-text-primary tracking-tight">
              শিখুন নিজের <span className="text-brand-primary">পছন্দমতো</span>{" "}
              সময়ে
            </h2>
            <p className="text-text-secondary mt-2 font-inter font-medium">
              Explore our premium Islamic curriculum
            </p>
          </div>
          <Link
            to="/courses"
            className="px-6 py-2.5 border-2 border-brand-primary text-brand-primary rounded-full font-bold hover:bg-brand-primary hover:text-white transition-all duration-300"
          >
            View All Courses
          </Link>
        </div>
        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group relative bg-white rounded-2xl border border-border-subtle hover:border-brand-primary/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(47,124,116,0.1)] flex flex-col overflow-hidden"
            >
              {/* Thumbnail Section */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-brand-primary text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm font-inter">
                  {course.category.name}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-1 text-brand-premium mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                  <span className="text-[10px] text-text-secondary font-inter ml-1">
                    (4.9)
                  </span>
                </div>

                <h3 className="text-lg font-bengali font-bold text-text-primary leading-[1.4] mb-4 group-hover:text-brand-primary transition-colors min-h-[3.5rem] line-clamp-2">
                  {course.title}
                </h3>

                {/* Footer Info */}
                <div className="mt-auto pt-4 border-t border-border-subtle flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-text-secondary font-inter uppercase font-bold tracking-wider">
                      Course Fee
                    </p>
                    <p className="text-xl font-bold text-brand-primary">
                      {course.is_paid ? `৳${parseInt(course.price)}` : "FREE"}
                    </p>
                  </div>

                  <Link
                    to={`/courses/${course.slug}`}
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-soft text-brand-primary group-hover:bg-brand-premium group-hover:text-white transition-all duration-300 transform group-hover:rotate-[-45deg]"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>

              {/* Hover Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <PlayCircle
                  size={48}
                  className="text-white drop-shadow-2xl"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseGrid;
