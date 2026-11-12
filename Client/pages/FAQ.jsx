
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

function FAQ() {
  const faqs = [
    {
      question: "What is the CM Kerala Grievance Portal?",
      answer:
        "It is a recruitment prototype that demonstrates how citizens can submit and track public grievances through an online portal.",
    },
    {
      question: "How can I submit a grievance?",
      answer:
        "Register or log in to your citizen account, open the grievance submission page, enter the required details and submit your complaint.",
    },
    {
      question: "Will I receive a reference number?",
      answer:
        "Yes. Each successfully submitted grievance will receive a unique reference number that can be used to track its status.",
    },
    {
      question: "How can I track my grievance?",
      answer:
        "You can use your grievance reference number to check its current status and available updates.",
    },
    {
      question: "Can I upload supporting documents?",
      answer:
        "Yes. The portal is designed to support optional image and document attachments while submitting a grievance.",
    },
    {
      question: "Who reviews my grievance?",
      answer:
        "The CMO dashboard is designed to review grievances and forward them to the concerned department for further action.",
    },
    {
      question: "Can I provide feedback after resolution?",
      answer:
        "Yes. Citizens will be able to provide feedback after their grievance is marked as resolved.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="min-h-screen bg-gray-50 px-5 py-20">
      <div className="mx-auto max-w-4xl">

        <div className="mb-14 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-800">
            Need Help?
          </p>

          <h1 className="text-4xl font-bold text-blue-950">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 text-gray-600">
            Find answers to common questions about the grievance portal.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-blue-950">
                  {faq.question}
                </span>

                {activeIndex === index ? (
                  <FiMinus className="shrink-0 text-blue-900" />
                ) : (
                  <FiPlus className="shrink-0 text-blue-900" />
                )}
              </button>

              {activeIndex === index && (
                <div className="border-t border-gray-100 px-5 py-4 leading-7 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-gray-500">
          This is a recruitment prototype and is not an official
          Government of Kerala website.
        </p>

      </div>
    </section>
  );
}

export default FAQ;
