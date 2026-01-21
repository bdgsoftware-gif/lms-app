const Topbar = () => {
  return (
    <div className="bg-[#102B29] text-white text-sm font-inter">
      <div className="max-w-8xl mx-auto px-4 h-10 md:h-16 flex items-center justify-between">
        {/* Left */}
        <div className="hidden md:flex gap-4 text-white text-sm">
          <span className="flex items-center gap-1">
            {/* Envelope SVG */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.667.667H3.333A3.337 3.337 0 0 0 0 4v8a3.34 3.34 0 0 0 3.333 3.333h9.334A3.337 3.337 0 0 0 16 12V4A3.337 3.337 0 0 0 12.667.667M3.333 2h9.334a2 2 0 0 1 1.853 1.258L9.415 8.364a2.005 2.005 0 0 1-2.83 0L1.48 3.258A2 2 0 0 1 3.333 2m9.334 12H3.333a2 2 0 0 1-2-2V5l4.31 4.307a3.34 3.34 0 0 0 4.714 0L14.667 5v7a2 2 0 0 1-2 2" />
            </svg>
            support@azmion.com
          </span>
          <span className="flex items-center gap-1">
            {/* Phone SVG */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.666.667A.667.667 0 0 1 9.333 0a6.674 6.674 0 0 1 6.666 6.667.667.667 0 1 1-1.333 0 5.34 5.34 0 0 0-5.333-5.334.667.667 0 0 1-.667-.666M9.333 4a2.667 2.667 0 0 1 2.666 2.667.667.667 0 0 0 1.334 0 4.004 4.004 0 0 0-4-4 .667.667 0 1 0 0 1.333m6.062 7.16a2.067 2.067 0 0 1 0 2.918l-.607.7C9.328 20.004-3.959 6.72 1.188 1.243l.767-.667a2.054 2.054 0 0 1 2.884.027c.021.02 1.256 1.625 1.256 1.625a2.067 2.067 0 0 1-.004 2.855l-.772.97a8.52 8.52 0 0 0 4.62 4.63l.977-.776a2.067 2.067 0 0 1 2.854-.004s1.604 1.235 1.625 1.255m-.918.969s-1.595-1.228-1.616-1.248a.734.734 0 0 0-1.032 0 302 302 0 0 1-1.363 1.09.67.67 0 0 1-.653.101 10 10 0 0 1-5.88-5.87.67.67 0 0 1 .096-.667s1.072-1.345 1.09-1.362a.733.733 0 0 0 0-1.033c-.021-.02-1.248-1.617-1.248-1.617a.733.733 0 0 0-1.007.026l-.767.667C-1.664 6.737 9.85 17.612 13.813 13.867l.608-.7a.747.747 0 0 0 .056-1.038" />
            </svg>
            +880 1234 567890
          </span>
        </div>

        {/* Center */}
        <div className="text-center flex-1 md:flex-none">
          <span className="font-medium text-base">
            ক্যারিয়ারে এগিয়ে যেতে দরকারি দক্ষতা অর্জন করুন Azmion এ!
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 text-white">
          {/* Facebook */}
          <a
            href="#"
            className="flex items-center justify-center w-8 h-8 bg-[#495E5C] rounded-md hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 9 16">
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

          {/* Language Selector */}
          <div className="relative group ml-3 text-sm">
            <button className="h-8 w-auto bg-[#495E5C] px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:opacity-90 transition-opacity">
              {/* Bangladesh Flag SVG */}
              <svg className="w-4 h-4" viewBox="0 0 20 16" fill="none">
                <rect width="20" height="16" fill="#006A4E" />
                <circle cx="7.5" cy="8" r="5" fill="#F42A41" />
              </svg>
              <span className="text-xs">বাংলা</span>
              {/* Dropdown Arrow SVG */}
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-1 w-32 bg-[#495E5C] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button className="w-full px-3 py-2 flex items-center gap-2 hover:bg-[#3a4b4a] rounded-t-md transition-colors">
                {/* Bangladesh Flag */}
                <svg className="w-4 h-4" viewBox="0 0 20 16" fill="none">
                  <rect width="20" height="16" fill="#006A4E" />
                  <circle cx="7.5" cy="8" r="5" fill="#F42A41" />
                </svg>
                <span className="text-xs">বাংলা</span>
              </button>
              <button className="w-full px-3 py-2 flex items-center gap-2 hover:bg-[#3a4b4a] rounded-b-md transition-colors">
                {/* UK Flag */}
                <svg className="w-4 h-4" viewBox="0 0 20 16" fill="none">
                  <rect width="20" height="16" fill="#012169" />
                  <path
                    d="M0 0L20 16M20 0L0 16"
                    stroke="#C8102E"
                    strokeWidth="2"
                  />
                  <path d="M8 0H12V16H8V0Z" fill="#C8102E" />
                  <path d="M0 6V10H20V6H0Z" fill="#C8102E" />
                  <path d="M0 0L20 16" stroke="white" strokeWidth="4" />
                  <path d="M20 0L0 16" stroke="white" strokeWidth="4" />
                  <path d="M8 0H12V16H8V0Z" fill="white" />
                  <path d="M0 6V10H20V6H0Z" fill="white" />
                </svg>
                <span className="text-xs">English</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
