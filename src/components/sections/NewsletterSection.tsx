const NewsletterSection = () => {
  return (
    <section className="py-12 bg-bg-accent">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
        <p className="mt-4 text-gray-600">
          Subscribe to our newsletter and get updates on new courses and offers.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="w-full sm:w-80 px-4 py-3 rounded border focus:outline-none focus:ring-0"
          />

          <button
            type="submit"
            className="px-6 py-3 bg-brand-primary text-white rounded hover:opacity-90 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
