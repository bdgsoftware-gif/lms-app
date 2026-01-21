import { partners } from "../../data/partners";

const PartnersSection = () => {
  return (
    <section className="py-6 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 font-inter">
          <h6 className="text-2xl leading-relaxed font-normal text-text-primary">
            আমাদের পার্টনার ও সহযোগী প্রতিষ্ঠান
          </h6>
          {/* <p className="mt-3 text-gray-600">
            আমরা শিল্পের নেতাদের এবং উদ্ভাবনী কোম্পানিদের সহযোগিতা করি।
          </p> */}
        </div>

        {/* Carousel */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-12 animate-partners">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="min-w-[160px] h-20 bg-gray-100 rounded-xl flex items-center justify-center text-text-secondary font-semibold"
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
