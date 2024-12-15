"use client";
import { useState } from "react";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is AI-Interview-Mocker?",
      answer:
        "AI-Interview-Mocker is a platform that helps you prepare for job interviews with AI-generated questions and feedback.",
    },
    {
      question: "How does the voice recording work?",
      answer:
        "You can record your answers using our voice-to-text feature. The system converts it into text for feedback analysis.",
    },
    {
      question: "Is the platform free to use?",
      answer:
        "Yes, we offer a free tier with basic features. Premium plans include advanced feedback and insights.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b-8 shadow-lg border-blue-700 pb-4 px-4 py-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {faq.question}
                </h3>
                <span className="text-gray-500">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
