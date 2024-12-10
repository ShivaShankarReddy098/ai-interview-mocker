"use client";
import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Webcam from "react-webcam";

const InterviewPage = ({ params }) => {
  //in this we need to fetch the interview mockData
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  return (
    <div className="mt-40">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex my-5 gap-5 flex-col ">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong> Full Stack Developer
            </h2>{" "}
            {/*this job position can get by database */}
            <h2 className="text-lg">
              <strong>Job Description:</strong> React
            </h2>
            <h2 className="text-lg">
              <strong>year of experience:</strong> 5
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-200">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-600">
              Enable Video Web Cam and Microphone to Start your AI generated
              Mock Interview,it has 5 question which you can answer and at the
              last you will get the report on the basis of your answer.NOTE:We
              never record your video,Web can access you can disable at any time
              if you want{" "}
            </h2>
          </div>
        </div>
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
      <div className="flex justify-end items-end">
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
