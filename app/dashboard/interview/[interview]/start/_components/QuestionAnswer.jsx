import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionAnswer = ({ mockInterviewQuestionsArray, activeIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Speech recognition is not supported for this browser");
    }
  };
  return (
    <div className="p-5 border rounded-lg my-10 ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockInterviewQuestionsArray &&
          mockInterviewQuestionsArray.map((questionAnswer, index) => {
            return (
              <div
                key={index}
                className={`border p-2 rounded-full cursor-pointer text-center ${
                  activeIndex === index
                    ? "bg-primary text-white"
                    : "bg-secondary"
                }`}
              >
                <h2 className="text-sm">Question # {index + 1}</h2>
              </div>
            );
          })}
      </div>
      <div className="my-4 font-bold">
        <div className="mx-2">
          <Volume2
            className="cursor-pointer border p-[2px] rounded-md"
            onClick={() =>
              textToSpeech(mockInterviewQuestionsArray[activeIndex].question)
            }
          />
          Que {activeIndex + 1} :- &nbsp;{" "}
          {mockInterviewQuestionsArray[activeIndex].question}
        </div>
      </div>
      <div className="border mt-20 p-4 rounded-md text-primary font-bold bg-blue-200">
        <h2 className="flex gap-4">
          <Lightbulb /> Note: Click on Record Button we will give you result
          after your record has been stop
        </h2>
      </div>
    </div>
  );
};

export default QuestionAnswer;
