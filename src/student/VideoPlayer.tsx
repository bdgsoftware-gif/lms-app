import { useEffect, useState, useRef } from "react";
import { fetchLessonVideo } from "../api/coursePlayer.api";

interface WatchData {
  title: string;
  video_url: string;
  duration: number;
}

interface Props {
  lessonId: number;
  onNext?: () => void;
  onPrev?: () => void;
  currentLessonNumber: number;
  totalLessons: number;
}

const VideoPlayer = ({
  lessonId,
  onNext,
  onPrev,
  currentLessonNumber,
  totalLessons,
}: Props) => {
  const [data, setData] = useState<WatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousDataRef = useRef<WatchData | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        if (data) {
          setIsTransitioning(true);
          previousDataRef.current = data;
        } else {
          setLoading(true);
        }

        setError(null);
        const videoData = await fetchLessonVideo(lessonId);
        setData(videoData);
        previousDataRef.current = null;
      } catch (error: any) {
        console.error("Failed to load video:", error);

        if (error.response?.status === 403) {
          setError("এই পাঠটি লক করা আছে। কোর্সে এনরোল করুন।");
        } else {
          setError("ভিডিও লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        }
      } finally {
        setLoading(false);
        setIsTransitioning(false);
      }
    };

    loadVideo();
  }, [lessonId]);

  // Initial loading state (first load)
  if (loading && !previousDataRef.current) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="bg-gray-300 aspect-video"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  if (!data && !previousDataRef.current) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600 text-center">কোনো ভিডিও পাওয়া যায়নি</p>
      </div>
    );
  }

  // Use current data or previous data during transition
  const displayData = data || previousDataRef.current;

  if (!displayData) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
        {/* Loading Overlay - shows during transition */}
        {isTransitioning && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-3"></div>
              <p className="text-sm text-gray-600 font-medium">পরবর্তী পাঠ লোড হচ্ছে...</p>
            </div>
          </div>
        )}

        {/* Video Container */}
        <div className={`relative bg-black transition-opacity duration-200 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          <div className="relative w-full aspect-video">
            {displayData.video_url ? (
              <iframe
                key={displayData.video_url} // Force remount when video changes
                src={displayData.video_url}
                title={displayData.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>ভিডিও URL পাওয়া যায়নি</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Info */}
        <div className={`p-6 transition-opacity duration-200 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                {displayData.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formatDuration(displayData.duration)}
                </span>
                <span className="text-gray-400">•</span>
                <span>
                  পাঠ {currentLessonNumber} / {totalLessons}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <button
              onClick={onPrev}
              disabled={!onPrev || isTransitioning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${onPrev && !isTransitioning
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-gray-50 text-gray-400 cursor-not-allowed"
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              আগের পাঠ
            </button>

            <button
              onClick={onNext}
              disabled={!onNext || isTransitioning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${onNext && !isTransitioning
                  ? "bg-brand-primary text-white hover:bg-brand-secondary"
                  : "bg-gray-50 text-gray-400 cursor-not-allowed"
                }`}
            >
              {isTransitioning ? (
                <>
                  <span className="animate-spin inline-block">⏳</span>
                  লোড হচ্ছে...
                </>
              ) : (
                <>
                  পরবর্তী পাঠ
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;