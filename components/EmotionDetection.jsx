"use client";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const MODEL_URL = "/models";

const EmotionDetection = ({ onEmotionChange }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(null);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 300,
    height: 300,
  });
  const [emotions, setEmotions] = useState({
    neutral: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    fearful: 0,
    disgusted: 0,
    surprised: 0,
  });

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      try {
        setModelError(null);

        // First load the tiny face detector
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        console.log("Tiny Face Detector loaded");

        // Then load face landmarks
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        console.log("Face Landmarks loaded");

        // Then load face expressions
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        console.log("Face Expressions loaded");

        setIsModelLoaded(true);
      } catch (error) {
        console.error("Error loading face-api models:", error);
        setModelError(error.message);
      }
    };

    loadModels();
  }, []);

  // Handle video dimensions
  useEffect(() => {
    if (webcamRef.current) {
      const video = webcamRef.current.video;
      const updateDimensions = () => {
        if (video.videoWidth && video.videoHeight) {
          setVideoDimensions({
            width: video.videoWidth,
            height: video.videoHeight,
          });
        }
      };

      video.addEventListener("loadedmetadata", updateDimensions);
      return () =>
        video.removeEventListener("loadedmetadata", updateDimensions);
    }
  }, []);

  // Process video stream
  const processVideo = async () => {
    if (!webcamRef.current || !canvasRef.current || !isModelLoaded) return;

    try {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      // Ensure video is playing and has valid dimensions
      if (!video.videoWidth || !video.videoHeight) {
        requestAnimationFrame(processVideo);
        return;
      }

      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight,
      };

      // Match canvas size with video
      faceapi.matchDimensions(canvas, displaySize);

      // Detect faces and expressions
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      // Resize detections to match canvas
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // Clear canvas
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw detections
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      // Update emotions if detected
      if (resizedDetections.length > 0) {
        const currentEmotions = resizedDetections[0].expressions;
        setEmotions(currentEmotions);

        // Find dominant emotion
        const dominantEmotion = Object.entries(currentEmotions).reduce((a, b) =>
          a[1] > b[1] ? a : b
        )[0];

        // Call the callback with emotion data
        onEmotionChange({
          dominantEmotion,
          confidence: currentEmotions[dominantEmotion],
          allEmotions: currentEmotions,
        });
      }

      // Continue processing
      requestAnimationFrame(processVideo);
    } catch (error) {
      console.error("Error processing video:", error);
      setModelError(error.message);
    }
  };

  // Start processing when model is loaded
  useEffect(() => {
    if (isModelLoaded) {
      processVideo();
    }
  }, [isModelLoaded]);

  if (modelError) {
    return (
      <div className="flex items-center justify-center h-full bg-red-50 rounded-lg p-4">
        <p className="text-red-600 text-center">
          Error loading emotion detection: {modelError}
          <br />
          Please ensure you have downloaded the required model files.
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative"
      style={{ width: videoDimensions.width, height: videoDimensions.height }}
    >
      <Webcam
        ref={webcamRef}
        mirrored={true}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        videoConstraints={{
          width: 300,
          height: 300,
          facingMode: "user",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
      {!isModelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <p className="text-white">Loading emotion detection models...</p>
        </div>
      )}
    </div>
  );
};

export default EmotionDetection;
