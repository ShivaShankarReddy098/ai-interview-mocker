import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-blue-700  text-white">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-2 ">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-gray-200 mb-4">
            Start practicing now and receive tailored feedback to improve your
            performance.
          </p>
        </div>
        <div>
          <Link
            href={"/dashboard"}
            className="px-4 py-2  bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
}
