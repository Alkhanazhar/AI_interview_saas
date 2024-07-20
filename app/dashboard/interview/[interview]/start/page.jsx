"use client";

import { db } from "@/utils/db";
import { mockInterView } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import QuestionAnswer from "./_components/QuestionAnswer";
import RecordAnswer from "./_components/RecordAnswer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = ({ params }) => {
  const [interview, setInterview] = useState();
  const [mockInterviewQuestion, setMockInterview] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  // const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db
        .select()
        .from(mockInterView)
        .where(eq(mockInterView.mockId, params.interview));
      setInterview(res[0]);
      setMockInterview(JSON.parse(res[0].mockInterView));
    };
    fetchData();
  
  }, [activeIndex]);
  return (
    interview && (
      <div className=" px-4 md:px-20 lg:px-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* questions */}
          <QuestionAnswer
            mockInterviewQuestionsArray={mockInterviewQuestion}
            activeIndex={activeIndex}
          />
          {/* webcam */}
          <RecordAnswer
            mockInterviewQuestionsArray={mockInterviewQuestion}
            activeIndex={activeIndex}
            interview={interview}
          />
        </div>
        <div className="flex justify-end gap-6">
          {activeIndex > 0 && (
            <Button onClick={() => setActiveIndex(activeIndex - 1)}>
              Previous
            </Button>
          )}
          {activeIndex !== mockInterviewQuestion?.length - 1 && (
            <Button onClick={() => setActiveIndex(activeIndex + 1)}>
              Next
            </Button>
          )}
          {activeIndex == mockInterviewQuestion.length - 1 && (
            <Link href={"/dashboard/interview/"+interview.mockId+"/feedback"}>
              <Button>End Interview</Button>
            </Link>
          )}
        </div>
      </div>
    )
  );
};  

export default page;
