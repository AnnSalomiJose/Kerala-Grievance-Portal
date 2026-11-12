
import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
} from "react-icons/fi";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Enquiry:", formData);

    alert("Your enquiry has been submitted successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
<section
  id="contact"
  className="min-h-screen bg-gray-50 px-5 py-16"
>
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-800">
            Get In Touch
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
            Have questions or need assistance? Send us your enquiry
            using the form below.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">

          {/* Contact Information */}
          <div className="rounded-2xl bg-blue-950 p-8 text-white">
            <h2 className="text-2xl font-bold">
              Contact Information
            </h2>

            <p className="mt-4 leading-7 text-blue-200">
              Reach out to us for assistance regarding the
              grievance redressal portal.
            </p>

            <div className="mt-10 space-y-8">

              <div className="flex gap-4">
                <FiMapPin className="mt-1 text-2xl text-blue-300" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="mt-1 text-sm text-blue-200">
                    Kerala, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FiMail className="mt-1 text-2xl text-blue-300" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="mt-1 text-sm text-blue-200">
                    Contact through this enquiry form
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FiPhone className="mt-1 text-2xl text-blue-300" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="mt-1 text-sm text-blue-200">
                    Contact details are not configured
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm lg:col-span-2">

            <h2 className="mb-7 text-2xl font-bold text-gray-900">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="5"
                  required
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-blue-900 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-800"
              >
                Submit Enquiry
                <FiSend />
              </button>

              <p className="text-xs text-gray-500">
                Recruitment prototype. Submitted enquiries are not
                stored yet; database integration will be added later.
              </p>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
