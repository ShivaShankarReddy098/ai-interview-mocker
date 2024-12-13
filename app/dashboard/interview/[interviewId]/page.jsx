"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import Link from "next/link";

const InterviewPage = ({ params }) => {
  const mockId = params.interviewId;
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch interview details using the mockId
  const GetInterviewDetails = async () => {
    try {
      const result = await fetch(
        `http://ai-interview-mocker-azure.vercel.app/api/mockInterviews/${mockId}`
      );

      if (result.ok) {
        const mockInterview = await result.json();
        console.log("API Response:", mockInterview);

        // Handle array response
        if (Array.isArray(mockInterview) && mockInterview.length > 0) {
          setInterviewData(mockInterview[0]); // Use the first object
        } else {
          console.error("Error: Response is empty or not an array.");
        }
      } else {
        console.error("Error: Interview not found");
      }
    } catch (error) {
      console.error("Error fetching mock interview:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mockId) {
      GetInterviewDetails();
    }
  }, [mockId]);

  if (loading) {
    return <div className="text-center text-lg py-10">Loading...</div>;
  }

  if (!interviewData) {
    return (
      <div className="text-center text-lg py-10 text-red-500">
        Error loading interview details. Please try again later.
      </div>
    );
  }

  return (
    <div className="mt-28 px-4 md:px-20">
      <h2 className="font-bold text-3xl mb-10">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section */}
        <div className="flex flex-col gap-5">
          {/* Interview Details Card */}
          <div className="p-5 rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold">
              <strong>Job Role/Position:</strong>{" "}
              {interviewData?.jobPosition || "N/A"}
            </h2>
            <h2 className="text-lg font-semibold mt-3">
              <strong>Job Description:</strong>{" "}
              {interviewData?.jobDescription || "N/A"}
            </h2>
            <h2 className="text-lg font-semibold mt-3">
              <strong>Years of Experience:</strong>{" "}
              {interviewData?.yearsOfExperience || "N/A"}
            </h2>
          </div>

          {/* Information Box */}
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-200">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-600">
              Enable Video Web Cam and Microphone to start your AI-generated
              Mock Interview. You will get 5 questions to answer, and a report
              will be generated based on your responses.
              <br />
              <strong>Note:</strong> We never record your video. You can disable
              the webcam at any time.
            </h2>
          </div>
        </div>

        {/* Right Section */}
        <div>
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                className="flex justify-center items-center w-full"
                onClick={() => setWebcamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-end items-end mt-2">
        <Link
          href={`/dashboard/interview/${params.interviewId}/startInterview`}
        >
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewPage;
