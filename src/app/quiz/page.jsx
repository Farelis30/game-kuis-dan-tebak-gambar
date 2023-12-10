"use client";
import AudioPlayer from "@/components/AudioPlayer";
import QuizContent from "@/components/QuizContent";
import QuizSelector from "@/components/QuizSelector";
import React, { useState } from "react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const linearGradientStyle = {
    background: "linear-gradient(to right top, #7844C7, #B787FF)",
  };

  return (
    <div className="flex justify-center" style={linearGradientStyle}>
      <AudioPlayer src={"/entranceSong.mp3"} />
      <QuizContent
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />
      <QuizSelector
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />
    </div>
  );
};

export default Quiz;
