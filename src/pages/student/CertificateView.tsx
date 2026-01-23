import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchCertificate,
  generateCertificate,
} from "../../api/certificate.api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificateView = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);

  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    const loadCertificate = async () => {
      try {
        const cert = await fetchCertificate(Number(courseId));
        setCertificate(cert);
      } catch (fetchError: any) {
        // If certificate doesn't exist, try to generate it
        if (fetchError.response?.status === 404) {
          try {
            setIsGenerating(true);
            const newCert = await generateCertificate(Number(courseId));
            setCertificate(newCert);
          } catch (genError: any) {
            const message =
              genError.response?.data?.message ||
              "আপনি এখনো এই কোর্সটি সম্পন্ন করেননি। সার্টিফিকেট পেতে কোর্স সম্পন্ন করুন।";
            setError(message);
          } finally {
            setIsGenerating(false);
          }
        } else {
          setError("সার্টিফিকেট লোড করতে সমস্যা হয়েছে।");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCertificate();
  }, [courseId]);

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      setDownloadingPDF(true);

      // Capture the certificate as canvas
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // Convert to PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`certificate-${certificate.certificate_number}.pdf`);
    } catch (error) {
      console.error("Failed to download PDF:", error);
      alert("PDF ডাউনলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setDownloadingPDF(false);
    }
  };

  const handleShare = async () => {
    const verifyUrl = `${import.meta.env.VITE_API_URL.replace("/api", "")}/verify/certificates/${certificate.certificate_number}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "আমার সার্টিফিকেট",
          text: `আমি "${certificate.course_title}" কোর্সটি সম্পন্ন করেছি!`,
          url: verifyUrl,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(verifyUrl);
      alert("লিংক কপি করা হয়েছে!");
    }
  };

  if (loading || isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-primary mx-auto"></div>
          <p className="text-gray-700 font-medium text-lg">
            {isGenerating ? "সার্টিফিকেট তৈরি হচ্ছে..." : "সার্টিফিকেট লোড হচ্ছে..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
          <div className="text-6xl">📜</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              সার্টিফিকেট পাওয়া যায়নি
            </h2>
            <p className="text-gray-600">{error}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/student/dashboard")}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              ড্যাশবোর্ডে যান
            </button>
            <button
              onClick={() => navigate(`/student/courses/${courseId}`)}
              className="flex-1 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition font-medium"
            >
              কোর্সে ফিরে যান
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/student/dashboard")}
            className="flex items-center gap-2 text-gray-700 hover:text-brand-primary transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">ড্যাশবোর্ডে ফিরে যান</span>
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition border border-gray-200 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              শেয়ার করুন
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={downloadingPDF}
              className={`flex items-center gap-2 px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition font-medium ${downloadingPDF ? "opacity-60 cursor-not-allowed" : ""
                }`}
            >
              {downloadingPDF ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  ডাউনলোড হচ্ছে...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PDF ডাউনলোড করুন
                </>
              )}
            </button>
          </div>
        </div>

        {/* Certificate */}
        <div
          ref={certificateRef}
          className="bg-white mx-auto shadow-2xl relative overflow-hidden"
          style={{ aspectRatio: "16/11" }}
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary rounded-full -translate-x-48 -translate-y-48"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full translate-x-48 translate-y-48"></div>
          </div>

          {/* Border */}
          <div className="absolute inset-4 border-8 border-double border-yellow-500 rounded-lg"></div>
          <div className="absolute inset-6 border-2 border-yellow-400 rounded-lg"></div>

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-16 text-center">
            {/* Logo/Badge */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-4xl shadow-lg">
                🏆
              </div>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-gray-800 tracking-wide mb-2">
                Certificate of Completion
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto"></div>
            </div>

            <p className="text-lg text-gray-600 mb-4">This certifies that</p>

            {/* Student Name */}
            <h2 className="text-4xl font-bold text-brand-primary mb-8 relative">
              {certificate.user_name}
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent"></div>
            </h2>

            {/* Course Info */}
            <p className="text-gray-700 mb-2">has successfully completed the course</p>
            <h3 className="text-3xl font-bold text-gray-800 mb-12 max-w-2xl">
              {certificate.course_title}
            </h3>

            {/* Footer */}
            <div className="w-full flex justify-between items-end px-12 mt-auto">
              <div className="text-left">
                <div className="text-sm text-gray-500 mb-1">Issued on</div>
                <div className="font-semibold text-gray-800">
                  {formatDate(certificate.issued_at)}
                </div>
              </div>

              <div className="text-center">
                <div className="w-32 border-t-2 border-gray-800 mb-2"></div>
                <div className="text-sm font-semibold text-gray-800">Authorized Signature</div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Certificate ID</div>
                <div className="font-mono text-xs text-gray-800 max-w-[200px] break-all">
                  {certificate.certificate_number}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Link */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-700 mb-3 font-medium">
            এই সার্টিফিকেটটি যাচাই করতে নিচের লিংকে ক্লিক করুন:
          </p>

          <a href={`${import.meta.env.VITE_API_URL.replace("/api", "")}/verify/certificates/${certificate.certificate_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:underline font-mono text-sm break-all inline-flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            /verify/certificates/{certificate.certificate_number}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;