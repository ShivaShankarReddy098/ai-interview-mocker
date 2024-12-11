import mongoose from "mongoose";

const MockInterviewSchema = new mongoose.Schema({
  jobPosition: {
    type: String,
    required: true,
    maxlength: 100,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: String,
    required: true,
    min: 0,
  },
  jsonMockResp: {
    type: [Object],
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  mockId: {
    type: String,
    required: true,
  },
});

const MockInterview =
  mongoose.models.MockInterview ||
  mongoose.model("MockInterview", MockInterviewSchema);
export default MockInterview;
