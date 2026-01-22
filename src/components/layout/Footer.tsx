import {
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Logo from "../../assets/logo-white.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="relative bg-bg-primary text-white pt-20">
      {/* Subtle Pattern / Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)] pointer-events-none" />

      <div className="relative max-w-8xl mx-auto px-4">
        {/* Top Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 pb-16 border-b border-white/10 font-inter">
          {/* Brand */}
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                alt="C M Moin Academy Logo"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mt-7">
              আমাদের লক্ষ্য হলো মানুষকে স্বাস্থ্য, অর্থনৈতিক স্বাধীনতা ও আত্মিক
              উন্নতির মাধ্যমে একটি সচেতন ও অর্থবহ জীবন গড়ে তুলতে সহায়তা করা।
            </p>

            <div className="flex gap-4 mt-6 text-base text-text-secondary font-inter">
              {/* Facebook */}
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 bg-[#495E5C] rounded-md hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="white" viewBox="0 0 9 16">
                  <path d="M5.39325 16V8.70218H7.84184L8.20921 5.85725H5.39325V4.04118C5.39325 3.21776 5.62097 2.65661 6.80309 2.65661L8.30832 2.65599V0.111384C8.04801 0.0775563 7.15446 0 6.11447 0C3.94279 0 2.45602 1.32557 2.45602 3.75942V5.85725H0V8.70218H2.45602V16H5.39325Z" />
                </svg>
              </a>

              {/* Whatsapp */}
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 bg-[#495E5C] rounded-md hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="white" viewBox="0 0 16 16">
                  <path d="M13.3059 2.67206C11.9026 1.26709 10.0363 0.493011 8.04807 0.492188C3.95108 0.492188 0.61673 3.82645 0.615082 7.92453C0.614532 9.23456 0.956757 10.5134 1.60724 11.6406L0.552734 15.4922L4.49307 14.4586C5.5788 15.0508 6.80112 15.3629 8.04504 15.3633H8.04816C12.1447 15.3633 15.4794 12.0287 15.481 7.93048C15.4818 5.94434 14.7094 4.07693 13.3059 2.67206ZM8.04807 14.108H8.0455C6.93698 14.1075 5.84979 13.8096 4.90112 13.2469L4.67563 13.1129L2.33737 13.7263L2.96149 11.4466L2.81454 11.2128C2.19611 10.2292 1.86954 9.09229 1.87009 7.92499C1.87137 4.51877 4.64285 1.74756 8.05054 1.74756C9.70068 1.74811 11.2519 2.39154 12.4182 3.5593C13.5846 4.72705 14.2266 6.27924 14.226 7.93002C14.2246 11.3365 11.4533 14.108 8.04807 14.108ZM11.4368 9.48102C11.2511 9.388 10.338 8.93884 10.1677 8.87677C9.99759 8.81479 9.87363 8.78394 9.74994 8.96979C9.62607 9.15564 9.2702 9.57404 9.1618 9.69791C9.05341 9.82187 8.94519 9.83743 8.75943 9.74442C8.57367 9.65149 7.97528 9.45529 7.26584 8.82257C6.71378 8.33011 6.34106 7.72192 6.23267 7.53607C6.12445 7.35004 6.23175 7.25922 6.31415 7.15704C6.5152 6.90738 6.71652 6.64563 6.77841 6.52176C6.84039 6.3978 6.80936 6.28931 6.76285 6.19638C6.71652 6.10345 6.34509 5.1893 6.19037 4.81732C6.03949 4.45532 5.88651 4.50421 5.77243 4.49854C5.66422 4.49313 5.54034 4.49203 5.41647 4.49203C5.29269 4.49203 5.09146 4.53845 4.92117 4.72449C4.75098 4.91043 4.27124 5.35968 4.27124 6.27383C4.27124 7.18799 4.93674 8.07111 5.02957 8.19507C5.12241 8.31903 6.33923 10.1949 8.20224 10.9993C8.64536 11.1909 8.99124 11.305 9.26105 11.3906C9.70599 11.532 10.1107 11.512 10.4308 11.4642C10.7877 11.4109 11.5295 11.0149 11.6844 10.5811C11.8392 10.1472 11.8392 9.77545 11.7927 9.69791C11.7463 9.62045 11.6225 9.57404 11.4368 9.48102Z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 bg-[#495E5C] rounded-md hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 font-inter">দ্রুত লিংক</h4>
            <ul className="space-y-2 text-base text-text-secondary font-inter">
              <li>
                <a className="hover:text-white" href="/courses">
                  Courses
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="/login">
                  Login
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="/register">
                  Register
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 font-inter">কোর্সসমূহ</h4>
            <ul className="space-y-2 text-base text-text-secondary font-inter">
              <li>
                <a className="hover:text-white" href="#">
                  FAQs
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 font-inter">যোগাযোগ করুন</h4>
            <ul className="space-y-3 text-base text-text-secondary font-inter">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-white/90" />
                support@azmion.com
              </li>

              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-white/90" />
                +880 1234 567890
              </li>

              <li className="flex items-center gap-3">
                <FaClock className="text-white/90" />
                Monday to Sunday, 9:00 AM – 6:00 PM
              </li>

              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-white/90" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between text-base text-text-secondary font-inter">
          <p>
            © {new Date().getFullYear()} C M Moin Infinity Academy. সকল অধিকার
            সংরক্ষিত
          </p>
          <p className="mt-2 md:mt-0">টার্মস & কন্ডিশন | প্রাইভেসি পলিসি</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
