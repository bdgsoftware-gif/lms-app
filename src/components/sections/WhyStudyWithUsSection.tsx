import { motion } from "framer-motion";
import { whyUsData } from "../../data/whyUs";
import LearningExperience from "../../assets/learning-experience.jpg";

const WhyStudyWithUsSection = () => {
  return (
    <section className="py-24 bg-bg-light">
      <div className="max-w-8xl mx-auto px-4 font-inter">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 font-inter">
          <h2 className="text-[32px] md:text-[42px] leading-relaxed font-normal text-text-primary">
            কেন এই প্ল্যাটফর্ম আপনার জীবনের মোড় ঘুরিয়ে দিতে পারে?
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Cards */}
          <div className="space-y-10">
            {whyUsData.slice(0, 2).map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-4 bg-bg-card p-6 rounded-2xl shadow-sm"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-primary text-white">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg text-text-primary">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex justify-center"
          >
            <div className="w-full max-w-xs h-96 bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={LearningExperience}
                alt="Learning Experience"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          </motion.div>


          {/* Right Cards */}
          <div className="space-y-10">
            {whyUsData.slice(2).map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-4 bg-bg-card p-6 rounded-2xl shadow-sm"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-primary text-white">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg text-text-primary">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyStudyWithUsSection;
