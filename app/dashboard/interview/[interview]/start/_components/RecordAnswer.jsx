"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { chatSession } from "@/utils/geminiAi";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { userAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswer = ({
  mockInterviewQuestionsArray,
  activeIndex,
  interview,
}) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const saveUserAnswer = async () => {
    try {
      console.log(interview);
      if (!transcript) return;
      SpeechRecognition.stopListening();
      setLoading(true);
      if (answer.length < 10) {
        setLoading(false);
        return toast("Please enter a valid answer ");
      }
      const prompt =
        "question is" +
        mockInterviewQuestionsArray[0].question +
        "and answer is" +
        answer +
        " give me json of rating out of ten and feedback in json format only";
      const res = await chatSession.sendMessage(prompt);
      const data = res.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const jsonData = JSON.parse(data);
      console.log(jsonData);

      const mock = await db.insert(userAnswer).values({
        mockId: interview.mockId,
        question: mockInterviewQuestionsArray[activeIndex].question,
        userAns: answer,
        correctAns: mockInterviewQuestionsArray[activeIndex].answer,
        feedback: jsonData.feedback,
        rating: jsonData.rating,
        userEmail: user.primaryEmailAddress.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });
      if (mock) {
        toast("Your answer recorded successfully");
      }
      setAnswer("");
      resetTranscript();
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    setAnswer(transcript);
    console.log(answer);
  }, [transcript]);
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();
  return (
    <div className="border p-5 rounded-lg my-10 ">
      <Webcam
        width={300}
        height={500}
        mirrored={true}
        className="rounded-md w-full"
      />
      <div className="text-center">
        <div className="flex justify-center gap-3 mt-2 items-center flex-wrap">
          <p className="text-sm">Microphone: {listening ? "on" : "off"}</p>
          <Button onClick={startListening} disabled={listening}>
            Start
          </Button>
          <Button variant="" onClick={stopListening} disabled={!listening}>
            Stop
          </Button>
          <Button onClick={saveUserAnswer}>
            Save Answer #{activeIndex + 1}
          </Button>
          {/* <Button onClick={resetTranscript}>Reset</Button> */}
        </div>
        <p className="mt-4">{transcript}</p>
      </div>
    </div>
  );
};

export default RecordAnswer;
