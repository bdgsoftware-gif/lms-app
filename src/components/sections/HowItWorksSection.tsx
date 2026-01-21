import { motion } from "framer-motion";
import { howItWorksData } from "../../data/howItWorks";

const HowItWorksSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#21665F] to-[#102B29]">
      {/* Background blur circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-8xl mx-auto px-4 text-white font-inter">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-[32px] md:text-[42px] leading-relaxed text-text-primary font-normal">
            কীভাবে শুরু করবেন?
          </h2>
          <p className="mt-8 text-white/80">
            মাত্র কয়েকটি সহজ ধাপে আপনার উন্নতির যাত্রা শুরু করুন
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {howItWorksData.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.01 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 h-full flex flex-col"
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 mb-5">
                  <Icon className="text-xl text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl text-white font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-[#DEDEDE] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
