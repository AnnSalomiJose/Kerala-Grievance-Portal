
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiFileText,
  FiSearch,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiUsers,
  FiMessageSquare,
  FiArrowUpRight,
  FiActivity,
  FiHeart,
  FiGlobe,
} from "react-icons/fi";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiFileText />,
      title: "Submit Grievance",
      description:
        "Register your complaints online through a simple and accessible process.",
    },
    {
      icon: <FiSearch />,
      title: "Track Your Complaint",
      description:
        "Track your grievance using a unique reference number.",
    },
    {
      icon: <FiShield />,
      title: "Transparent Process",
      description:
        "Follow the progress of your complaint through every stage.",
    },
    {
      icon: <FiClock />,
      title: "Timely Updates",
      description:
        "Stay informed about actions taken on your grievance.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Register",
      description: "Create your citizen account to access the portal.",
    },
    {
      number: "02",
      title: "Submit Grievance",
      description: "Provide complaint details and supporting documents.",
    },
    {
      number: "03",
      title: "Review & Action",
      description:
        "Your complaint is reviewed and forwarded to the concerned department.",
    },
    {
      number: "04",
      title: "Track & Resolve",
      description:
        "Track progress and view the resolution of your complaint.",
    },
  ];

  const departments = [
    "Health & Family Welfare",
    "Education",
    "Revenue",
    "Local Self Government",
    "Public Works",
    "Transport",
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-white">

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(35px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(96,165,250,.12); }
          50% { box-shadow: 0 0 40px rgba(96,165,250,.3); }
        }

        .fade-up {
          animation: fadeUp .9s ease-out both;
        }

        .delay-1 { animation-delay: .15s; }
        .delay-2 { animation-delay: .3s; }
        .delay-3 { animation-delay: .45s; }

        .floating {
          animation: float 5s ease-in-out infinite;
        }

        .glow-card {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .feature-card {
          transition: all .35s ease;
        }

        .feature-card:hover {
          transform: translateY(-9px);
        }

        .department-card {
          transition: all .3s ease;
        }

        .department-card:hover {
          transform: translateY(-5px);
        }
      `}</style>

      {/* HERO SECTION */}

      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800"
      >
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-400 opacity-10 blur-3xl"></div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">

          <div className="fade-up">

            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-blue-300/30 bg-white/10 px-5 py-2.5 text-sm text-blue-100 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/50"></span>
              Citizen Grievance Redressal Portal
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Voice Matters.
              <span className="mt-3 block bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                We Are Here to Listen.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
              A transparent digital platform that empowers citizens
              to submit grievances, track their progress and stay
              informed about the actions taken.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <button
                onClick={() => navigate("/login")}
                className="group flex items-center gap-3 rounded-xl bg-white px-7 py-4 font-bold text-blue-950 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-cyan-100"
              >
                Submit a Grievance
                <FiArrowRight className="transition group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-3 rounded-xl border border-white/40 px-7 py-4 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Track Complaint
                <FiSearch />
              </button>

            </div>

            <p className="mt-8 text-xs text-blue-200">
              Recruitment prototype – not an official Government of Kerala website.
            </p>

          </div>

          {/* HERO RIGHT CARD */}

          <div className="fade-up delay-2 flex justify-center lg:justify-end">

            <div className="glow-card floating w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl sm:p-9">

              <div className="mb-8 flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-blue-200">
                    Citizen Services
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white">
                    How can we help?
                  </h2>
                </div>

                <div className="rounded-2xl bg-white/15 p-4 text-3xl text-cyan-200">
                  <FiMessageSquare />
                </div>

              </div>

              <div className="space-y-4">

                <button
                  onClick={() => navigate("/login")}
                  className="group flex w-full items-center justify-between rounded-2xl bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-blue-100 p-4 text-2xl text-blue-900">
                      <FiFileText />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Register a Complaint
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Submit your grievance
                      </p>
                    </div>

                  </div>

                  <FiArrowUpRight className="text-xl text-blue-900 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="group flex w-full items-center justify-between rounded-2xl bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-green-100 p-4 text-2xl text-green-700">
                      <FiSearch />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Track Your Complaint
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Check current status
                      </p>
                    </div>

                  </div>

                  <FiArrowUpRight className="text-xl text-blue-900 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

              </div>

              <div className="mt-7 border-t border-white/20 pt-6 text-center">
                <p className="text-sm text-blue-100">
                  Simple. Transparent. Accessible.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section id="about" className="px-5 py-24 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="fade-up mx-auto max-w-2xl text-center">

            <p className="font-bold uppercase tracking-[3px] text-blue-700">
              Citizen Services
            </p>

            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              A Better Way to Raise Your Voice
            </h2>

            <p className="mt-5 leading-8 text-gray-500">
              Access grievance services through one convenient
              and transparent digital platform.
            </p>

          </div>

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`feature-card fade-up delay-${index % 3 + 1} rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:border-blue-200 hover:shadow-xl`}
              >

                <div className="mb-6 inline-flex rounded-2xl bg-blue-50 p-4 text-3xl text-blue-800">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section
        id="how-it-works"
        className="bg-gradient-to-b from-gray-50 to-blue-50/50 px-5 py-24 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="font-bold uppercase tracking-[3px] text-blue-700">
              Simple Process
            </p>

            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>

            <p className="mt-5 text-gray-500">
              Four simple steps to submit and track your grievance.
            </p>

          </div>

          <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {steps.map((step) => (
              <div
                key={step.number}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-950 text-xl font-bold text-white transition group-hover:bg-blue-700">
                  {step.number}
                </div>

                <h3 className="mt-7 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  {step.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}

      <section id="departments" className="px-5 py-24 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <p className="font-bold uppercase tracking-[3px] text-blue-700">
                Public Services
              </p>

              <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                Concerned Departments
              </h2>

              <p className="mt-4 text-gray-500">
                Grievances can be directed to the relevant departments.
              </p>
            </div>

            <a
              href="#departments"
              className="flex items-center gap-2 font-semibold text-blue-800 transition hover:gap-4"
            >
              View Departments <FiArrowRight />
            </a>

          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {departments.map((department) => (
              <div
                key={department}
                className="department-card flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-blue-200 hover:bg-blue-50"
              >

                <div className="rounded-xl bg-blue-100 p-4 text-2xl text-blue-900">
                  <FiUsers />
                </div>

                <h3 className="font-bold text-gray-800">
                  {department}
                </h3>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* VALUES SECTION */}

      <section className="bg-blue-950 px-5 py-16 text-white lg:px-8">

        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">

          <div className="text-center">
            <FiShield className="mx-auto text-4xl text-cyan-300" />
            <h3 className="mt-4 text-xl font-bold">Transparency</h3>
            <p className="mt-3 text-sm leading-7 text-blue-200">
              Clear visibility into grievance progress and actions.
            </p>
          </div>

          <div className="text-center">
            <FiHeart className="mx-auto text-4xl text-cyan-300" />
            <h3 className="mt-4 text-xl font-bold">Citizen First</h3>
            <p className="mt-3 text-sm leading-7 text-blue-200">
              A convenient platform designed around citizen needs.
            </p>
          </div>

          <div className="text-center">
            <FiGlobe className="mx-auto text-4xl text-cyan-300" />
            <h3 className="mt-4 text-xl font-bold">Accessibility</h3>
            <p className="mt-3 text-sm leading-7 text-blue-200">
              Digital access to grievance services from anywhere.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}

      <section id="track" className="px-5 py-24 lg:px-8">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-7 py-16 text-center shadow-2xl sm:px-12">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl text-cyan-200">
            <FiActivity />
          </div>

          <h2 className="mt-7 text-3xl font-extrabold text-white sm:text-4xl">
            Your Voice Can Make a Difference
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-blue-200">
            Register your grievance and follow its progress
            through a transparent redressal process.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-blue-950 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-cyan-100"
          >
            Get Started
            <FiArrowRight />
          </button>

        </div>
      </section>

      {/* CONTACT */}

      <section
        id="contact"
        className="border-t border-gray-200 bg-gray-50 px-5 py-12 lg:px-8"
      >

        <div className="mx-auto max-w-7xl text-center">

          <h2 className="text-2xl font-bold text-gray-900">
            Need Assistance?
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Use the Contact Us section to send your enquiries.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Home;
