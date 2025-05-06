"use client";
import Image from "next/image";
import Webcam from "react-webcam";
import webImg from "@/public/webCam1.png";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import EmotionDetection from "@/components/EmotionDetection";

export default function RecordAnswerSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const userAnswerRef = useRef("");
  const [emotionData, setEmotionData] = useState(null);
  const { user } = useUser();

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Update userAnswer in real-time from speech-to-text results
  useEffect(() => {
    if (results?.length > 0) {
      const latestResult = results[results.length - 1]?.transcript || "";
      if (latestResult.trim()) {
        const updatedAnswer = `${
          userAnswerRef.current
        } ${latestResult.trim()}`.trim();
        userAnswerRef.current = updatedAnswer;
        setUserAnswer(updatedAnswer);
      }
    }
  }, [results]);

  const handleEmotionChange = (emotionInfo) => {
    setEmotionData(emotionInfo);
  };

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      toast.info("Recording stopped. Processing your answer...");
      try {
        // Send prompt to Gemini AI for feedback
        const feedbackPrompt = `
          Question: ${mockInterviewQuestions[activeQuestionIndex]?.question}, 
          User Answer: ${userAnswerRef.current.trim()}, 
          User's Emotional State: ${
            emotionData?.dominantEmotion
          } (Confidence: ${emotionData?.confidence}),
          Based on the user's answer and emotional state, provide a JSON response with:
          - 'rating' field (1-10)
          - 'feedback' field (constructive suggestions)
          - 'emotional_feedback' field (suggestions for managing emotions during interviews)
        `;

        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = result.response
          .text()
          .replace("```json", "")
          .replace("```", "");
        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        // Save the user's answer and feedback to the backend
        const userAnswerRes = await fetch(
          "https://ai-interview-mocker-azure.vercel.app/api/userAnswers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mockId: interviewData.mockId,
              question: mockInterviewQuestions[activeQuestionIndex]?.question,
              correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
              userAns: userAnswerRef.current.trim(),
              feedback: JsonFeedbackResp?.feedback,
              rating: JsonFeedbackResp?.rating,
              emotionalFeedback: JsonFeedbackResp?.emotional_feedback,
              dominantEmotion: emotionData?.dominantEmotion,
              emotionConfidence: emotionData?.confidence,
              userEmail: user?.primaryEmailAddress?.emailAddress,
              createdAt: moment().format("DD-MM-YYYY"),
            }),
          }
        );

        if (userAnswerRes.ok) {
          toast.success("User Answer Saved Successfully");
          setUserAnswer("");
          userAnswerRef.current = "";
          setResults([]);
          setEmotionData(null);
        } else {
          toast.error("Failed to save user answer");
        }
      } catch (error) {
        console.error("Error saving user answer:", error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      setUserAnswer("");
      userAnswerRef.current = "";
      setResults([]);
      startSpeechToText();
      toast.info("Recording started. Speak now...");
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
    <div className="flex items-center justify-center flex-col lg:h-screen">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg relative">
        <Image
          src={webImg}
          alt="camera"
          width={200}
          height={200}
          className="absolute"
        />
        <div className="w-[300px] h-[300px] relative">
          <EmotionDetection onEmotionChange={handleEmotionChange} />
        </div>
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
      {emotionData && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            Current Emotion: {emotionData.dominantEmotion}
            (Confidence: {(emotionData.confidence * 100).toFixed(1)}%)
          </p>
        </div>
      )}
    </div>
  );
}
