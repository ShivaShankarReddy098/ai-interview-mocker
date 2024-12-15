export default function HowItWorks() {
  const steps = [
    {
      title: "Step 1",
      description: "Select your role and provide interview details.",
      icon: "📝",
    },
    {
      title: "Step 2",
      description: "Record your answers using our AI-powered recorder.",
      icon: "🎤",
    },
    {
      title: "Step 3",
      description: "Receive feedback, ratings, and suggestions.",
      icon: "📈",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg transform hover:-translate-y-2 transition duration-300"
            >
              <div className="text-5xl">{step.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
