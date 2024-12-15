
export default function PricingSection() {
  const plans = [
    {
      name: "Free Plan",
      price: "Free",
      features: ["Basic questions", "Voice recording", "Limited feedback"],
      style: "bg-white",
    },
    {
      name: "Pro Plan",
      price: "100/month",
      features: [
        "Advanced AI feedback",
        "Unlimited questions",
        "Detailed performance insights",
      ],
      style: "bg-blue-700 text-white transform scale-105",
    },
    {
      name: "Enterprise",
      price: "1000/month",
      features: ["Team analysis", "Dedicated support", "Custom reports"],
      style: "bg-white",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 mt-5">Our Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg ${plan.style} transition-all`}
            >
              <h3 className="text-2xl font-semibold mb-3">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-sm">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`px-4 py-2 rounded-full mt-2 ${
                  index === 1
                    ? "bg-white text-blue-600"
                    : "bg-blue-700 text-white"
                } hover:opacity-90 transition`}
              >
                {index === 1 ? "Most Popular" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
