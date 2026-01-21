import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../../data/testimonials";

const INTERVAL = 4000;

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center font-inter">
        {/* Header */}
        <h2 className="text-[32px] md:text-[42px] leading-relaxed text-text-primary font-normal mb-6">
          শিক্ষার্থীরা কী বলছেন
        </h2>
        {/* <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          Thousands of learners trust our platform to grow their skills.
        </p> */}

        {/* Slider */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[index].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-bg-light border rounded-2xl p-8 shadow-sm max-w-3xl mx-auto"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                “{testimonials[index].quote}”
              </p>

              <div>
                <p className="font-semibold">{testimonials[index].name}</p>
                <p className="text-sm text-gray-500">
                  {testimonials[index].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
