"use client";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-20 pb-10 px-4 md:px-8 bg-background">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          How AI Interview Mocker Works
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          Your personal AI-powered interview preparation companion
        </p>

        {/* Steps Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card p-8 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-user-plus text-2xl text-primary"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">1. Create Your Profile</h3>
            <p className="text-muted-foreground">
              Sign up and tell us about your target role, industry, and
              experience level. We'll customize your interview experience
              accordingly.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-laptop text-2xl text-primary"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">2. Start Your Interview</h3>
            <p className="text-muted-foreground">
              Choose from various interview types - behavioral, technical, or
              role-specific. Our AI interviewer will begin asking relevant
              questions.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-chart-bar text-2xl text-primary"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">3. Get Feedback</h3>
            <p className="text-muted-foreground">
              Receive instant feedback on your responses, including detailed
              analysis of your answers, communication style, and areas for
              improvement.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-robot text-primary"></i>
              </div>
              <div>
                <h3 className="font-bold mb-2">AI-Powered Interviews</h3>
                <p className="text-muted-foreground">
                  Advanced AI technology that provides realistic interview
                  scenarios and adaptive questioning.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-comments text-primary"></i>
              </div>
              <div>
                <h3 className="font-bold mb-2">Real-time Feedback</h3>
                <p className="text-muted-foreground">
                  Immediate analysis of your responses with actionable
                  suggestions for improvement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-book text-primary"></i>
              </div>
              <div>
                <h3 className="font-bold mb-2">Extensive Question Bank</h3>
                <p className="text-muted-foreground">
                  Access to thousands of industry-specific questions and best
                  practice answers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Practice Makes Perfect</h2>
            <p className="text-muted-foreground mb-6">
              The more you practice, the more confident you'll become. Our
              platform adapts to your progress, gradually increasing the
              complexity of questions as you improve.
            </p>
            <button className="bg-primary text-primary-foreground py-2 px-6 rounded-md hover:bg-primary/90 transition-colors">
              Start Practicing Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
