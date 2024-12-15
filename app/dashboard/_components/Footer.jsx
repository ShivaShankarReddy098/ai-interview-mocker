export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            About AI-Interview-Mocker
          </h3>
          <p className="text-gray-400 text-sm">
            AI-Interview-Mocker helps you prepare for interviews by providing
            tailored mock interviews with AI-generated questions, feedback, and
            ratings.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>
              <a href="/about" className="hover:text-blue-500 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/features" className="hover:text-blue-500 transition">
                Features
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-500 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-blue-500 transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>Email: shankarreddyshiva83@gmail.com</li>
            <li>Phone: +91 8494907891</li>
            <li>Address: Bengaluru, Karnataka, India</li>
          </ul>
          <div className="flex mt-4 space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-blue-600 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-blue-700 transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 text-gray-500 text-sm py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} AI-Interview-Mocker. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
