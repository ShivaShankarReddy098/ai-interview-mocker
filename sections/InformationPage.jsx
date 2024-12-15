export default function FeaturesSection() {
  const features = [
    {
      title: "Voice-to-Text",
      description: "Accurate real-time voice recording.",
      icon: "🎙️",
    },
    {
      title: "AI Feedback",
      description: "Instant feedback with AI analysis.",
      icon: "🤖",
    },
    {
      title: "Performance Reports",
      description: "Detailed insights to improve.",
      icon: "📊",
    },
    {
      title: "Custom Questions",
      description: "Tailored to your job role.",
      icon: "⚙️",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 mt-5">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-full flex flex-col items-center justify-center shadow-lg hover:scale-105 transition-transform"
            >
              <div className="text-5xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
