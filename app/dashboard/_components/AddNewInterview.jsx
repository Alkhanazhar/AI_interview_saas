"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/geminiAi";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { mockInterView } from "@/utils/schema";
import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const { user } = useUser();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState();
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    const prompt =
      "jobDescription:" +
      jobDescription +
      ",Job Role:" +
      jobRole +
      ",year of experiance:" +
      jobExperience +
      " give me 5 interview related to this experience question and answer in json use only json ";
    const data = await chatSession.sendMessage(prompt);

    const mutateData = data.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(mutateData));

    if (JSON.parse(mutateData)) {
      const res = await db
        .insert(mockInterView)
        .values({
          mockId: uuidv4(),
          mockInterView: mutateData,
          jobDescription: jobDescription,
          jobExperience: jobExperience,
          jobPosition: jobRole,
          createdAt: moment().format("DD-MM-YYYY"),
          createdBy: user?.primaryEmailAddress?.emailAddress,
        })
        .returning({ mockId: mockInterView.mockId });
      console.log(res);
      router.push("/dashboard/interview/" + res[0].mockId);
    }
    setLoading(false);
  }

  return (
    <div>
      <div
        className="p-10 text-center border rounded-md hover:bg-secondary hover:shadow-md cursor-pointer transition-all duration-150"
        onClick={() => setShowDialog(true)}
      >
        <h2 className="text-lg font-bold">+ Add Interview</h2>
      </div>
      <AlertDialog open={showDialog}>
        <AlertDialogContent>
          <form onSubmit={submit}>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tell Us more about mock interview
              </AlertDialogTitle>
              <AlertDialogDescription>
                Add details about your job position/role
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="mb-5 ">
              <label>Job Role</label>
              <Input
                required
                placeholder="Ex: React js developer,MERN stack,"
                onChange={(e) => setJobRole(e.target.value)}
              />
            </div>
            <div className="mb-5 ">
              <label>Job Description( tech stack )</label>
              <Textarea
                required
                placeholder="Ex:React js ,next js,mysql,Nodejs"
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div className="mb-5 ">
              <label>Year of experience</label>
              <Input
                required
                placeholder="Ex: 2"
                max={"100"}
                onChange={(e) => setJobExperience(e.target.value)}
                type="number"
              />
            </div>

            <AlertDialogFooter className="flex justify-end gap-5">
              {/* <AlertDialogCancel> */}
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
              {/* </AlertDialogCancel> */}
              {/* <AlertDialogAction> */}
              <Button disabled={loading} type="submit">
                {loading ? <LoaderCircle className="animate-spin" /> : ""}
                Continue
              </Button>
              {/* </AlertDialogAction> */}
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddNewInterview;
