"use client";
import React from "react";

const tips = [
  {
    id: 1,
    title: "Top 10 Questions for Software Engineer Interviews",
    description:
      "Learn the most common questions asked in software engineering interviews and how to answer them effectively.",
    link: "https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions-set-1/",
  },
  {
    id: 2,
    title: "How to Tackle Behavioral Questions",
    description:
      "Master the STAR method to answer behavioral interview questions with confidence and clarity.",
    link: "https://www.themuse.com/advice/star-interview-method",
  },
  {
    id: 3,
    title: "Improving Communication in Technical Interviews",
    description:
      "Tech interviews aren't just about coding; improve your communication to stand out.",
    link: "https://www.interviewkickstart.com/blog/how-to-improve-communication-skills",
  },
  {
    id: 4,
    title: "Body Language and Tone Tips for Online Interviews",
    description:
      "Ensure your body language, tone, and expressions project confidence in online interviews.",
    link: "https://www.roberthalf.com/blog/how-to-interview/body-language-tips-for-job-interviews",
  },
];

export default function TipsSection() {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Interview Preparation Tips
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Explore practical tips and trusted resources to boost your interview
          performance and stand out from the crowd.
        </p>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                {tip.title}
              </h3>
              <p className="text-gray-700 mb-4">{tip.description}</p>
              <a
                href={tip.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-medium"
              >
                Read More &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
