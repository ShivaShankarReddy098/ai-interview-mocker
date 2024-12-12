"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { aiRes } from "./apiChat";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const AddNewInterview = () => {
  const [openDialoag, setOpenDialoag] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonMockResp, setJsonMockResp] = useState([]);
  const router = useRouter();
  const { user } = useUser();
  const createdAt = moment().format("DD-MM-YYYY");
  const createdBy = user?.primaryEmailAddress?.emailAddress;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Generate mockId before the request is made
    const newMockId = uuidv4();

    // Generate AI responses for mock interview questions
    const jsonRespones = await aiRes(
      jobPosition,
      jobDescription,
      yearsOfExperience
    );

    // Set generated responses to the state
    setJsonMockResp((prev) => {
      const updatedState = [...prev, ...jsonRespones];
      return updatedState;
    });

    // Use the generated mockId and the updated jsonMockResp
    const newMockResp = [...jsonMockResp, ...jsonRespones];

    try {
      if (newMockResp && newMockResp.length > 0) {
        // Send the newMockId and the mock interview data to your API
        const res = await fetch("http://localhost:3000/api/mockInterviews", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            jobPosition,
            jobDescription,
            yearsOfExperience,
            jsonMockResp: newMockResp, // Send the updated responses
            createdBy,
            createdAt,
            mockId: newMockId, // Send the new mockId with the request
          }),
        });

        if (res.ok) {
          console.log("MockInterview Added Successfully");

          // Redirect to the newly created interview page using the mockId
          router.push(`/dashboard/interview/${newMockId}`);
          setLoading(false);
          setOpenDialoag(false);
        } else {
          console.error("Error adding MockInterview");
        }
      } else {
        console.error("ERROR: No mock responses generated");
      }
    } catch (err) {
      console.error("ERROR:", err);
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialoag(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialoag}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, job description,
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql"
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 4"
                      type="number"
                      required
                      max="50"
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <Button variant="ghost" onClick={() => setOpenDialoag(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        Questions...
                      </>
                    ) : (
                      <p>Start Interview</p>
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
    </div>
  );
};
