"use client";
import React from "react";

const rewards = [
  {
    id: 1,
    title: "Beginner Badge",
    description: "Complete your first mock interview to earn this badge.",
    icon: "🏅",
  },
  {
    id: 2,
    title: "Consistency Streak",
    description: "Practice daily for 5 days to earn streak points.",
    icon: "🔥",
  },
  {
    id: 3,
    title: "Expert Interviewer",
    description:
      "Score 90% or higher in 3 interviews to unlock this achievement.",
    icon: "🌟",
  },
  {
    id: 4,
    title: "Top Performer",
    description: "Be in the top 5% of performers to win exclusive rewards.",
    icon: "🏆",
  },
];

export default function Gamification() {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
           Earn Rewards 🎮
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Enhance your interview preparation experience by earning badges,
          streaks, and achievements as you progress.
        </p>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-5xl mb-4">{reward.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {reward.title}
              </h3>
              <p className="text-gray-600">{reward.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
