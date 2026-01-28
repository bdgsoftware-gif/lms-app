import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { heroData } from "../../data/home";
import HeroBanner from "../../assets/hero-banner.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleStartCourse = (): void => {
    navigate("/courses/quran20");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-left > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".hero-image", {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-gradient-to-b from-[#FBFEFE] to-[#E7F6F5]"
    >
      <div className="max-w-8xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div className="hero-left">
          <h1 className="font-inter text-[32px] md:text-[56px] text-text-primary font-bold !leading-normal">
            {heroData.title.split(heroData.highlight).map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index === 0 && (
                  <span className="text-brand-premium">
                    {heroData.highlight}
                  </span>
                )}
              </React.Fragment>
            ))}
          </h1>

          <p className="mt-6 md:text-lg text-text-secondary max-w-md">
            {heroData.subtitle}
          </p>

          <div className="md:mt-10 flex flex-col items-start gap-4">
            <div className="flex gap-4 items-center">
              <button
                onClick={handleStartCourse}
                className="px-6 py-3.5 bg-button-primary text-white font-inter rounded-3xl hover:bg-button-accent transition cursor-pointer"
              >
                কোর্স শুরু করুন
              </button>
              <button className="px-6 py-3.5 bg-white text-text-primary font-inter rounded-3xl hover:bg-button-accent hover:text-brand-premium transition">
                ফ্রি ওয়েবিনারে যোগ দিন
              </button>
            </div>

            <div className="flex items-center -space-x-3">
              {heroData.users.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`User ${i + 1}`}
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />
              ))}
              <span className="ml-4 font-inter text-sm font-medium text-gray-600">
                {heroData.enrolledCount} সক্রিয় শিক্ষার্থী
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="hero-image md:mt-6">
          <div className="w-full h-full rounded-3xl flex items-center justify-center p-4 bg-white">
            <img
              src={HeroBanner}
              alt="Hero Banner"
              className="rounded-2xl object-contain aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
