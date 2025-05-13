"use client";
// import Image from "next/image";
// import Link from "next/link";
// import teamImg from "@/public/team.jpg"; // You'll need to add this image

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-10 px-4 md:px-8 bg-background">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          About AI Interview Mocker
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          Empowering job seekers with AI-powered interview preparation
        </p>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              At AI Interview Mocker, we're dedicated to revolutionizing the way
              people prepare for job interviews. Our platform combines
              cutting-edge AI technology with practical interview scenarios to
              help candidates build confidence and succeed in their career
              journey.
            </p>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlYW18ZW58MHx8MHx8fDA%3D"
              alt="Our Team"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <i className="fas fa-rocket text-3xl text-blue-700 mb-4"></i>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              We leverage the latest AI technology to provide realistic
              interview experiences.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <i className="fas fa-users text-3xl text-blue-700 mb-4"></i>
            <h3 className="text-xl font-bold mb-2">Accessibility</h3>
            <p className="text-muted-foreground">
              Making professional interview preparation available to everyone.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <i className="fas fa-chart-line text-3xl text-blue-700 mb-4"></i>
            <h3 className="text-xl font-bold mb-2">Growth</h3>
            <p className="text-muted-foreground">
              Committed to continuous improvement and user success.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {["Shiva", "Dadapeer", "Madhu", "Tarun"].map((member) => (
              <div key={member} className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-32 h-32 rounded-full bg-secondary mx-auto mb-4"></div>
                <h3 className="font-bold mb-1">{member}</h3>
                <p className="text-sm text-muted-foreground">Developer</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions? We'd love to hear from you.
          </p>
          <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            <a href="/dashboard/contact">Contact Us</a>
          </button>
        </div>
      </div>
    </div>
  );
}
