const PageLoadingSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"
          role="status"
          aria-label="লোড হচ্ছে"
        >
          <span className="sr-only">পেজ লোড হচ্ছে...</span>
        </div>
        <p className="text-gray-600 font-medium">লোড হচ্ছে...</p>
      </div>
    </div>
  );
};

export default PageLoadingSkeleton;
