"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { mockInterView } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const InterviewList = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    user && getInterviewList();
  }, [user]);
  const getInterviewList = async () => {
    console.log(user);
    const res = await db
      .select()
      .from(mockInterView)
      .where(eq(mockInterView.createdBy, user.primaryEmailAddress.emailAddress))
      .orderBy(desc(mockInterView.id));
    setData(res);
  };

  return (
    <div>
      <h2 className="text-primary text-3xl font-bold my-1">
        Previous Interview List
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((item, index) => {
          return (
            <div key={index} className="border p-2 rounded-sm shadow-sm">
              <h1 className="text-primary font-bold text-md uppercase">
                {item.jobDescription}
              </h1>
              <h1>{item.jobExperience}</h1>
              <h1>{item.jobPosition}</h1>
              <h1>
                <strong>createdAt : &nbsp;</strong>
                {item.createdAt}
              </h1>
              <div className="flex justify-end gap-6 mt-2 ">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    router.push(
                      "/dashboard/interview/" + item.mockId + "/feedback"
                    )
                  }
                >
                  Feedback
                </Button>
                {/* <Button size="sm" className="w-full">
                  Start
                </Button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewList;
