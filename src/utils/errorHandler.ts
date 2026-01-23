export const handleApiError = (error: any): string => {
  if (error.response?.status === 401) {
    return "আপনার সেশন শেষ হয়ে গেছে। আবার লগইন করুন।";
  }

  if (error.response?.status === 403) {
    return "আপনার এই রিসোর্সে অ্যাক্সেস নেই।";
  }

  if (error.response?.status === 404) {
    return "রিসোর্স খুঁজে পাওয়া যায়নি।";
  }

  if (error.response?.status >= 500) {
    return "সার্ভার সমস্যা হয়েছে। দয়া করে পরে চেষ্টা করুন।";
  }

  if (error.message === "Network Error") {
    return "ইন্টারনেট সংযোগ পরীক্ষা করুন।";
  }

  return error.response?.data?.message || "একটি ত্রুটি ঘটেছে।";
};

export const logger = {
  error: (message: string, ...args: any[]) => {
    if (import.meta.env.DEV) {
      console.error(message, ...args);
    }
    // In production, you would send to error tracking service (Sentry, LogRocket, etc.)
  },
  warn: (message: string, ...args: any[]) => {
    if (import.meta.env.DEV) {
      console.warn(message, ...args);
    }
  },
  info: (message: string, ...args: any[]) => {
    if (import.meta.env.DEV) {
      console.info(message, ...args);
    }
  },
};
