
import {
  FiHeart,
  FiBookOpen,
  FiTruck,
  FiHome,
  FiShield,
  FiBriefcase,
  FiDroplet,
  FiZap,
} from "react-icons/fi";

function Departments() {
  const departments = [
    {
      name: "Health & Family Welfare",
      description: "Public healthcare, hospitals and medical services.",
      icon: <FiHeart />,
    },
    {
      name: "Education",
      description: "Schools, colleges and public education services.",
      icon: <FiBookOpen />,
    },
    {
      name: "Transport",
      description: "Road transport, traffic and public transportation.",
      icon: <FiTruck />,
    },
    {
      name: "Local Self Government",
      description: "Municipalities, panchayats and local civic services.",
      icon: <FiHome />,
    },
    {
      name: "Police & Home Affairs",
      description: "Public safety, law enforcement and security concerns.",
      icon: <FiShield />,
    },
    {
      name: "Revenue",
      description: "Land records, certificates and revenue-related matters.",
      icon: <FiBriefcase />,
    },
    {
      name: "Water Resources",
      description: "Water supply, irrigation and related public services.",
      icon: <FiDroplet />,
    },
    {
      name: "Power & Electricity",
      description: "Electricity supply and power-related complaints.",
      icon: <FiZap />,
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 px-5 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-800">
            Government Services
          </p>

          <h1 className="text-4xl font-bold text-blue-950">
            Departments
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Citizens can submit grievances related to different
            public service departments through this portal.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((department) => (
            <div
              key={department.name}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-900">
                {department.icon}
              </div>

              <h2 className="mb-3 text-lg font-bold text-blue-950">
                {department.name}
              </h2>

              <p className="text-sm leading-6 text-gray-600">
                {department.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Departments;
