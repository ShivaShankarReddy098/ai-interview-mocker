import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-wrap justify-between">
        {/* Branding and Tagline */}
        <div className="mb-6">
          <h1 className="text-xl font-bold">InterviewAI</h1>
          <p className="mt-2 text-sm text-gray-400">
            Empowering job seekers with AI-powered interview practice
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Connect</h2>
          <div className="mt-2 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>{" "}
              {/* Replace with an actual icon */}
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Newsletter</h2>
          <form className="mt-2 flex">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 w-64 rounded-l bg-gray-800 text-gray-400 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-teal-500 px-4 py-2 rounded-r text-white hover:bg-teal-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-500">
        © 2024 InterviewAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
