import { useState } from "react";
import { faqs } from "../../data/faqs";

const FAQSection = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#F9F9F9]">
      <div className="max-w-4xl mx-auto px-4 font-inter">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-[32px] md:text-[42px] leading-relaxed text-text-primary font-normal">
            সাধারণ প্রশ্নাবলী
          </h2>
          <p className="mt-4 font-sm text-text-secondary">
            আমাদের প্ল্যাটফর্ম সম্পর্কে সাধারণ প্রশ্নের উত্তর।
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = active === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setActive(isOpen ? null : faq.id)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left"
                >
                  <span className="font-medium text-text-primary font-inter text-xl">{faq.question}</span>
                  <span className="text-xl">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-4 text-base text-text-secondary font-inter">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
