import { UserButton } from "@clerk/nextjs";
import React from "react";
import { AddNewInterview } from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  return (
    <diV className="p-10 lg:h-screen">
      <h1 className="font-bold text-2xl mt-24">Dashboard</h1>
      <h className="text-gray-500">Create and Start your AI Mockup Interview</h>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
        <InterviewList />
      </div>
    </diV>
  );
}
export default Dashboard;
