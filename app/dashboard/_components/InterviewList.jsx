"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-3 bg-gray-100 rounded-lg p-4 shadow-md">
    <div className="h-6 bg-gray-300 rounded"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

function InterviewList() {
  const [interviewList, setInterviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { user } = useUser();

  useEffect(() => {
    if (user) GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    setIsLoading(true); // Show loader while fetching
    try {
      const result = await fetch(
        `https://ai-interview-mocker-azure.vercel.app/api/mockInterviews/lists/${user?.primaryEmailAddress.emailAddress}`
      );
      if (result.ok) {
        const interviewLists = await result.json();
        console.log("API Response for interviewLists:", interviewLists);
        setInterviewList(interviewLists);
      }
    } catch (err) {
      console.error("ERROR:", err);
    } finally {
      setIsLoading(false); // Hide loader after fetching
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Previous Mock Interview</h2>
      {/* Show skeleton loader while data is loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:mb-5">
          {[...Array(6)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : interviewList.length > 0 ? (
        // Show fetched data if available
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
        </div>
      ) : (
        // Show fallback message for empty list
        <p className="text-gray-500">No previous mock interviews found.</p>
      )}
    </div>
  );
}

export default InterviewList;
