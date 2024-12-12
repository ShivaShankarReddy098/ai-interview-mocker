"use client";
import Image from "next/image";
import Webcam from "react-webcam";
import webImg from "@/public/webCam1.png";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

export default function RecordAnswerSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const { error, isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });

  useEffect(() => {
    if (results.length > 0) {
      const latestResult = results[results.length - 1]?.transcript;
      if (latestResult && latestResult.trim()) {
        setUserAnswer((prev) => prev + " " + latestResult.trim());
      }
    }

    // Cleanup to prevent unnecessary updates
    return () => setUserAnswer((prev) => prev);
  }, [results]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer?.trim().length < 10) {
        toast.error("Your answer is too short. Please record again.");
        return;
      }

      try {
        const feedbackPrompt = `
          Question: ${mockInterviewQuestions[activeQuestionIndex]?.question}, 
          User Answer: ${userAnswer.trim()}, 
          Depends on the question and user answer for the given interview question.
          Please provide a rating (1 to 10) and feedback in JSON format, with a 'rating' field and 'feedback' field.
        `;
        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = result.response
          .text()
          .replace("```json", "")
          .replace("```", "");
        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        const userAnswerRes = await fetch(
          "http://localhost:3000/api/userAnswer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mockId: interviewData.mockId,
              question: mockInterviewQuestions[activeQuestionIndex]?.question,
              correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
              userAns: userAnswer.trim(),
              feedback: JsonFeedbackResp?.feedback,
              rating: JsonFeedbackResp?.rating,
              userEmail: user?.primaryEmailAddress?.emailAddress,
              createdAt: moment().format("DD-MM-YYYY"),
            }),
          }
        );

        if (userAnswerRes.ok) {
          toast.success("User Answer Saved Successfully");
        }

        setUserAnswer(""); // Reset the userAnswer
      } catch (error) {
        toast.error("Failed to save your answer. Please try again.");
        console.error(error);
      }
    } else {
      setUserAnswer(""); // Reset before starting
      startSpeechToText();
    }
  };
  if (error) {
    return (
      <p>
        Web Speech API is not available in this browser. Please try using{" "}
        <strong>Google Chrome</strong> and ensure microphone permissions are
        enabled.
      </p>
    );
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg  relative">
        <Image
          src={webImg}
          alt="camera"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        onClick={SaveUserAnswer}
        className="my-10 flex justify-center items-center"
        variant="outline"
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-blue-700 flex gap-1 items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
      <p>{userAnswer || "Your answer will appear here..."}</p>
    </div>
  );
}
