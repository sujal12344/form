const Footer = () => {
  // Function to handle location click
  const handleLocationClick = () => {
    // Google Maps URL for DRS Solar location in Lakhisarai
    const mapsUrl = "https://www.google.com/maps/search/?api=1&query=DRS+SOLAR+PRIVATE+LIMITED+Hotel+DRS+Deluxe+Main+Road+Purani+Bazar+Lakhisarai+Bihar+811311+India";
    window.open(mapsUrl, '_blank');
  };

  return (
    <footer className="bg-[#0A1628] text-white py-8 sm:py-12 px-3 sm:px-8">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            <img src="/drs-solar-logo.png" alt="Image not found" className="h-8 sm:h-12" />
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Empowering sustainable futures through innovative solar solutions. Leading the way in renewable energy technology and environmental stewardship.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white text-base sm:text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-white text-xs sm:text-sm">Dashboard</a>
              </li>
              <li>
                <a href="/projects" className="text-gray-400 hover:text-white text-xs sm:text-sm">Projects</a>
              </li>
              <li>
                <a href="/settings" className="text-gray-400 hover:text-white text-xs sm:text-sm">Settings</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white text-base sm:text-lg font-medium">Contact</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start space-x-2 sm:space-x-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href="tel:+919102240504" 
                  className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors duration-200"
                >
                  +91 91022 40504
                </a>
              </li>

              <li className="flex items-start space-x-2 sm:space-x-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="text-gray-400 text-xs sm:text-sm">
                  <a 
                    href="mailto:service@drsenterprises.in" 
                    className="hover:text-white transition-colors duration-200 block"
                  >
                    service@drsenterprises.in
                  </a>
                  <a 
                    href="mailto:info@drssolar.com" 
                    className="hover:text-white transition-colors duration-200 block"
                  >
                    info@drssolar.com
                  </a>
                </div>
              </li>

              <li 
                className="flex items-start space-x-2 sm:space-x-3 cursor-pointer group"
                onClick={handleLocationClick}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-gray-400 text-xs sm:text-sm group-hover:text-white transition-colors duration-200">
                  <p>DRS SOLAR PRIVATE LIMITED</p>
                  <p>Hotel DRS Deluxe</p>
                  <p>Main Road, Purani Bazar</p>
                  <p>Lakhisarai-Bihar 811311 (India)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
          <p className="text-gray-400 text-xs sm:text-sm">© 2025 DRS Solar. All rights reserved.</p>
          <div className="flex space-x-4 sm:space-x-6">
            <a href="/privacy" className="text-gray-400 hover:text-white text-xs sm:text-sm">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white text-xs sm:text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 