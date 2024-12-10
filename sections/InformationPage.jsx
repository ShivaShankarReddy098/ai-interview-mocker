import React from "react";

const Features = () => {
  const features = [
    {
      title: "AI-Powered Questions",
      description: "Personalized questions based on your field and experience",
      icon: "🤖",
    },
    {
      title: "Real-time Analysis",
      description: "Emotion and confidence tracking during your responses",
      icon: "🎥",
    },
    {
      title: "Detailed Feedback",
      description: "Comprehensive analysis and improvement suggestions",
      icon: "📊",
    },
  ];

  return (
    <section className="bg-gray-400 py-16">
      <div className="container mx-auto px-4 text-center">
        {/* Section Header */}
        <h2 className="text-4xl font-bold mb-8 mt-4">
          Why Choose InterviewAI?
        </h2>
        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105"
            >
              <div className="flex justify-center items-center text-teal-500 text-4xl mb-4">
                <span>{feature.icon}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
