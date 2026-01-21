import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Logo from "../../assets/logo.png";
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
              <img src={Logo} alt="C M Moin Academy Logo" className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mt-7">
              আমাদের লক্ষ্য হলো মানুষকে স্বাস্থ্য, অর্থনৈতিক স্বাধীনতা
              ও আত্মিক উন্নতির মাধ্যমে একটি সচেতন ও অর্থবহ জীবন গড়ে তুলতে সহায়তা করা।
            </p>

            <div className="flex gap-4 mt-6 text-base text-text-secondary font-inter">
              <a className="hover:text-brand-primary" href="#">
                <FaFacebookF />
              </a>
              <a className="hover:text-brand-primary" href="#">
                <FaLinkedinIn />
              </a>
              <a className="hover:text-brand-primary" href="#">
                <FaYoutube />
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
          <p>© {new Date().getFullYear()} C M Moin Infinity Academy.  সকল অধিকার সংরক্ষিত</p>
          <p className="mt-2 md:mt-0">টার্মস & কন্ডিশন | প্রাইভেসি পলিসি</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
