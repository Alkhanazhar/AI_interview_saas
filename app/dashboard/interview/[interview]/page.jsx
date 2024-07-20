"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { mockInterView } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, LucideWebcam } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";

const page = ({ params }) => {
  const router = useRouter();
  const [interview, setInterview] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db
        .select()
        .from(mockInterView)
        .where(eq(mockInterView.mockId, params.interview));
      console.log(res[0]);
      setInterview(res[0]);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col py-10">
      <h2 className="text-2xl font-bold text-center">Lets get started</h2>
      <div className="flex flex-col md:flex-row justify-center my-7 p-4">
        {webCamEnabled ? (
          <Webcam
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            width={300}
            height={300}
            mirrored={true}
            className="rounded-sm"
          />
        ) : (
          <div className="flex flex-col ">
            <LucideWebcam className="bg-secondary border rounded-md p-10 h-72 w-72 mb-4 text-black gap-7" />
            <Button
              variant={"ghost"}
              className="w-72 border"
              onClick={() => setWebCamEnabled(true)}
            >
              get enable your web cam
            </Button>
          </div>
        )}
        <div className="px-4 ">
          <div className="border p-4 ">
            <h2>
              Job Description : &nbsp;
              <strong>{interview?.jobDescription}</strong>
            </h2>
            <h2>
              Job Role/job position : &nbsp;
              <strong>{interview?.jobPosition}</strong>
            </h2>
            <h2>
              Job Experience : &nbsp;
              <strong>{interview?.jobExperience}</strong>
            </h2>
          </div>
          <div className="p-4 border rounded-md mt-2 bg-yellow-300">
            <div>
              <strong>
                <Lightbulb className="inline-block" />
                Information
              </strong>
              <p className="w-96 text-sm text-yellow-600">
                allows web applications to access media devices like cameras and
                microphones. Include a video element in your display the webcam
                feed.If granted, assign the video stream to the property of the
                video element. Ensure your website is served over browser, as
                webcam access requires a secure context.
              </p>
            </div>
          </div>
          <div className="mt-2 flex ">
            <Button
              onClick={() =>
                router.push("/dashboard/interview/" + params.interview + "/start")
              }
            >
              Start Interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
