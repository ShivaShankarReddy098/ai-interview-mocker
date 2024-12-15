export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "AI-Interview-Mocker transformed my interview preparation! The AI feedback is so accurate and helpful.",
      role: "Software Engineer",
    },
    {
      name: "Jane Smith",
      feedback:
        "I loved the voice recording feature. It helped me improve my confidence while answering tough questions.",
      role: "Data Analyst",
    },
    {
      name: "Alex Johnson",
      feedback:
        "The performance insights are a game-changer. I landed my dream job thanks to this platform!",
      role: "Product Manager",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow-md bg-gray-50"
            >
              <p className="text-gray-600 italic mb-4">
                "{testimonial.feedback}"
              </p>
              <div className="text-gray-800 font-semibold">
                - {testimonial.name}, {testimonial.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
