import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-gray-300 min-h-screen flex items-center justify-center p-8">
      <div className="container mx-auto max-w-5xl flex flex-wrap items-center justify-between bg-gray-100 p-8 rounded-lg shadow-lg">
        {/* Contact Form */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get In Touch
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message:
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            <i className="fas fa-globe text-teal-500"></i> East Point College of
            Engineering and Technology, Bangalore, Karnataka, India
          </p>
          <p className="mb-4">
            <i className="fas fa-phone text-teal-500"></i> +91 8494907891
          </p>
          <p className="mb-4">
            <i className="fas fa-envelope text-teal-500"></i>{" "}
            shankarreddyshiva83@gmail.com
          </p>
          <div className="flex space-x-4 mt-6">
            <a
              href="#"
              className="text-gray-600 hover:text-teal-500 transition"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-teal-500 transition"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-teal-500 transition"
              aria-label="GitHub"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
