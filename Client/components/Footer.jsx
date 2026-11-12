
import {
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-blue-950 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">

        {/* About Portal */}
        <div>
          <h2 className="text-2xl font-bold">
            CM Kerala
          </h2>

          <p className="mt-2 text-sm text-blue-200">
            Public Grievance Redressal Portal
          </p>

          <p className="mt-5 text-sm leading-7 text-blue-200">
            A digital platform prototype designed to help
            citizens submit grievances and track their progress.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 font-semibold">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm text-blue-200">

            <a href="#home" className="transition hover:text-white">
              Home
            </a>

            <a href="#about" className="transition hover:text-white">
              About Us
            </a>

            <a href="#how-it-works" className="transition hover:text-white">
              How It Works
            </a>

            <a href="#departments" className="transition hover:text-white">
              Departments
            </a>

            <a href="#contact" className="transition hover:text-white">
              Contact Us
            </a>

          </div>
        </div>

        {/* Citizen Services */}
        <div>
          <h3 className="mb-5 font-semibold">
            Citizen Services
          </h3>

          <div className="flex flex-col gap-3 text-sm text-blue-200">

            <a href="#register" className="transition hover:text-white">
              Submit Grievance
            </a>

            <a href="#track" className="transition hover:text-white">
              Track Grievance
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQs
            </a>

          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="mb-5 font-semibold">
            Contact Information
          </h3>

          <div className="space-y-4 text-sm text-blue-200">

            <p className="flex items-start gap-3">
              <FiMapPin className="mt-1 shrink-0" />
              Kerala, India
            </p>

            <p className="flex items-center gap-3">
              <FiMail className="shrink-0" />
              cmportal@gmail.com
            </p>

            <p className="flex items-center gap-3">
              <FiPhone className="shrink-0" />
              +91 7895490213
            </p>

          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="mb-5 font-semibold">
            Follow Us
          </h3>

          <p className="mb-5 text-sm leading-6 text-blue-200">
            Connect with us through social media.
          </p>

          <div className="flex items-center gap-3">

            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition duration-300 hover:bg-pink-600 hover:-translate-y-1"
            >
              <FaInstagram />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition duration-300 hover:bg-blue-600 hover:-translate-y-1"
            >
              <FaFacebookF />
            </a>

            {/* WhatsApp */}
            <a
              href="https://www.whatsapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition duration-300 hover:bg-green-600 hover:-translate-y-1"
            >
              <FaWhatsapp />
            </a>

          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="border-t border-white/10 px-5 py-5">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-center text-xs text-blue-300 sm:flex-row sm:text-left">

          <p>
            © {new Date().getFullYear()} CM Kerala Portal.
            All rights reserved.
          </p>

          <p>
            Not an official Government of Kerala website.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
