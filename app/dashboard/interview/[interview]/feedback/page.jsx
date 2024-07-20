"use client";
import { db } from "@/utils/db";
import { userAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const getFeedback = async () => {
    const mock = await db
      .select()
      .from(userAnswer)
      .where(eq(userAnswer.mockId, params.interview));
    setData(mock);
    console.log(mock);
  };
  useEffect(() => {
    getFeedback();
  }, []);
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
      <h2 className="text-2xl font-bold">Here your interview feedback</h2>
      <h2 className="text-xl font-bold text-primary my-3 border rounded-lg inline-block p-3">
        Your overall interview rating! 7/10
      </h2>
      <h4 className="text-gray-600 text-sm">
        your answer of these questions are showing down below you can check by
        clicking on collapsible button
      </h4>
      <div className="mt-2">
        {data?.map((item, index) => {
          return (
            <Collapsible
              key={index}
              className="p-2 px-4 border rounded-md mb-7"
            >
              <CollapsibleTrigger className="flex justify-between w-full">
                {item.question}
                <ChevronsUpDown />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="text-sm">
                  <h2 className="p-2 text-red-500 border rounded-lg">
                    <strong>Rating</strong> : {item.rating}
                  </h2>
                  <h2 className="p-2 text-red-900 mt-2 bg-red-200 border rounded-lg">
                    <strong> Your Answer</strong>: {item.userAns}
                  </h2>
                  <h2 className="p-2 text-green-900 mt-2 bg-green-200 border rounded-lg">
                    <strong> Correct Answer</strong>: {item.correctAns}
                  </h2>
                  <h2 className="p-2 text-blue-900 mt-2 bg-blue-200 border rounded-lg">
                    <strong> Feedback</strong>: {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
        <Button onClick={() => router.replace("/dashboard")} className="mt-4">
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default page;
