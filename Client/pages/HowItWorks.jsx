
function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Register & Login",
      description:
        "Create your citizen account and securely log in to the grievance portal.",
    },
    {
      number: "02",
      title: "Submit Grievance",
      description:
        "Select your district and category, describe your issue and upload supporting documents if needed.",
    },
    {
      number: "03",
      title: "Review & Assignment",
      description:
        "The grievance is reviewed by the CMO and forwarded to the concerned department.",
    },
    {
      number: "04",
      title: "Action & Resolution",
      description:
        "The assigned department investigates the complaint and submits an action-taken report.",
    },
    {
      number: "05",
      title: "Track Your Grievance",
      description:
        "Track the grievance status using your unique reference number and provide feedback after resolution.",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 px-5 py-20">
      <div className="mx-auto max-w-6xl">

        <div className="mb-16 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-800">
            Simple and Transparent
          </p>
          <h1 className="text-4xl font-bold text-blue-950">
            How It Works
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Our grievance redressal process helps citizens submit,
            track and receive updates on their complaints.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-900 text-xl font-bold text-white">
                {step.number}
              </div>

              <h2 className="mb-3 text-xl font-bold text-blue-950">
                {step.title}
              </h2>

              <p className="leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-blue-950 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">
            Your Voice Matters
          </h2>
          <p className="mt-3 text-blue-100">
            Submit your grievance and stay informed throughout the process.
          </p>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
