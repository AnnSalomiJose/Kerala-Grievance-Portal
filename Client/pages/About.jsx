
import {
  FiTarget,
  FiEye,
  FiShield,
  FiUsers,
  FiCheckCircle,
  FiHeart,
} from "react-icons/fi";

function About() {
  const values = [
    {
      icon: <FiShield />,
      title: "Transparency",
      description:
        "Promoting transparency by allowing citizens to follow the progress of their grievances.",
    },
    {
      icon: <FiUsers />,
      title: "Accessibility",
      description:
        "Providing a simple digital platform where citizens can submit complaints conveniently.",
    },
    {
      icon: <FiCheckCircle />,
      title: "Accountability",
      description:
        "Encouraging responsible handling and monitoring of submitted grievances.",
    },
    {
      icon: <FiHeart />,
      title: "Citizen First",
      description:
        "Keeping citizen concerns and public service improvement at the centre of the process.",
    },
  ];

  return (
    <section id="about" className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 px-5 py-20 text-center">
        <p className="font-semibold uppercase tracking-widest text-blue-300">
          About Our Portal
        </p>

        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
          Connecting Citizens With Solutions
        </h1>

        <p className="mx-auto mt-6 max-w-3xl leading-8 text-blue-100">
          A digital grievance redressal prototype designed to
          simplify complaint submission, improve transparency
          and support effective grievance tracking.
        </p>
      </div>

      {/* Introduction */}
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">

        <div>
          <p className="font-semibold uppercase tracking-widest text-blue-800">
            Who We Are
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900">
            Making Grievance Management Simpler and More Accessible
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            CM Kerala is a recruitment prototype of a public
            grievance redressal portal. It demonstrates how
            citizens can submit their concerns through a digital
            platform and track the progress of their complaints.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            The platform also demonstrates how administrators
            and department officers can review grievances,
            coordinate actions and update resolution details.
          </p>

          <div className="mt-7 space-y-4">
            {[
              "Easy online grievance submission",
              "Unique grievance reference number",
              "Transparent status tracking",
              "Department-level grievance management",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <FiCheckCircle className="shrink-0 text-xl text-green-600" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-blue-50 p-8 sm:p-12">
          <div className="grid gap-6 sm:grid-cols-2">

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <FiTarget className="text-3xl text-blue-900" />
              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Our Mission
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                To demonstrate a convenient and transparent
                digital process for managing public grievances.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <FiEye className="text-3xl text-blue-900" />
              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Our Vision
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                To explore technology-driven approaches that
                improve public service accessibility and accountability.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gray-50 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="font-semibold uppercase tracking-widest text-blue-800">
              Our Principles
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Our Core Values
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
              The principles that guide the design of this
              grievance management prototype.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="inline-flex rounded-xl bg-blue-100 p-4 text-2xl text-blue-900">
                  {value.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Disclaimer */}
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="font-bold text-amber-900">
            Prototype Disclaimer
          </h3>

          <p className="mt-2 text-sm leading-7 text-amber-800">
            This application is developed solely as a recruitment
            machine test prototype. It is not an official Government
            of Kerala or Chief Minister's Office website and is not
            authorized or endorsed by the government.
          </p>
        </div>
      </div>

    </section>
  );
}

export default About;
