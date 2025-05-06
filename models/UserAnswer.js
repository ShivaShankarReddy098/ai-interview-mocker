import mongoose from "mongoose";
const UserAnswerSchema = new mongoose.Schema({
  mockId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  correctAns: {
    type: String,
  },
  userAns: {
    type: String,
  },
  feedback: {
    type: String,
  },
  rating: {
    type: String,
  },
  emotionalFeedback: {
    type: String,
  },
  dominantEmotion: {
    type: String,
  },
  emotionConfidence: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});
const UserAnswer =
  mongoose.models.UserAnswer || mongoose.model("UserAnswer", UserAnswerSchema);
export default UserAnswer;
