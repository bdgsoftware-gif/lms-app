import HeroSection from "../../components/sections/HeroSection";
import CoursesSection from "../../components/sections/CoursesSection";
import HowItWorksSection from "../../components/sections/HowItWorksSection";
import WhyStudyWithUsSection from "../../components/sections/WhyStudyWithUsSection";
import TestimonialsSection from "../../components/sections/TestimonialsSection";
import PartnersSection from "../../components/sections/PartnersSection";
import FAQSection from "../../components/sections/FAQSection";
// import NewsletterSection from "../../components/sections/NewsletterSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CoursesSection />
      <HowItWorksSection />
      <WhyStudyWithUsSection />
      <TestimonialsSection />
      <PartnersSection />
      <FAQSection />
      {/* <NewsletterSection /> */}
    </>
  );
};

export default Home;
