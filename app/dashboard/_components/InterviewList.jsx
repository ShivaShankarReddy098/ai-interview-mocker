"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
function InterviewList() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
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
      console.log("ERROR:", err);
    }
  };
  return (
    <div>
      <h2 className="font-medium text-xl my-3">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
      </div>
    </div>
  );
}
export default InterviewList;
