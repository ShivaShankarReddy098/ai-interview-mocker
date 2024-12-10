import { chatSession } from "@/utils/GeminiAIModal";

export async function aiRes(jobPosition, jobDesc, jobExperience) {
  const newPrompt =
    "Job position:" +
    jobPosition +
    ", Job Description:" +
    jobDesc +
    ", Years of Experience:" +
    jobExperience +
    ", Depends on this, give us 10 interview questions along with answers in JSON format. Provide questions and answers in a JSON array.";

  // console.log("Sending prompt:", newPrompt);

  try {
    const result = await chatSession.sendMessage(newPrompt);
    const rawResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    const MockJsonResp = JSON.parse(rawResponse); // Parse the JSON response

    console.log("Generated Mock Interview Response:", MockJsonResp);
    return MockJsonResp;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return []; // Return an empty array in case of error
  }
}
