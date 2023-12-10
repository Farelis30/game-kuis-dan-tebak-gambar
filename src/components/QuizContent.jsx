"use client";
import React, { useReducer, useState, useEffect } from "react";
import QuizReducer, { actionTypes } from "@/utils/QuizReducer.js";
import { questions } from "@/utils/QuizQuestion";

const QuizContent = ({ currentQuestion, setCurrentQuestion }) => {
  const questionsPerPage = 1;
  const quizDuration = 50;
  const quizMaxTimes = 50;

  const initialState = {
    currentPage: 1,
    userAnswers: {},
    questions,
    score: 0,
    isSubmitted: false,
  };

  const [state, dispatch] = useReducer(QuizReducer, initialState);
  const [timer, setTimer] = useState(quizDuration);

  useEffect(() => {
    let countdown;
    if (!state.isSubmitted) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [state.isSubmitted, state.currentPage]);

  const handleAnswer = (questionId, selectedOption) => {
    const selectedOptionColor = getColorBasedOnOption(selectedOption); // Fungsi untuk mendapatkan warna berdasarkan opsi

    dispatch({
      type: actionTypes.ANSWER,
      payload: { questionId, selectedOption, selectedOptionColor },
    });
  };
  const handleSubmit = () => {
    dispatch({ type: actionTypes.SUBMIT });
  };

  const handleNextPage = () => {
    setCurrentQuestion(currentQuestion + 1);
    dispatch({ type: actionTypes.NEXT_PAGE });
  };

  const handlePrevPage = () => {
    setCurrentQuestion(currentQuestion - 1);
    dispatch({ type: actionTypes.PREV_PAGE });
  };

  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion =
    currentQuestion === Math.ceil(state.questions.length / questionsPerPage);
  const visibleQuestions = state.questions.slice(
    (currentQuestion - 1) * questionsPerPage,
    currentQuestion * questionsPerPage
  );

  return (
    <div className="bg-[#20324E] text-white w-1/2 h-auto m-3 p-6 rounded relative">
      <progress
        className="progress progress-warning w-full absolute top-0 left-0"
        value={timer}
        max={quizMaxTimes}
      ></progress>

      <div className="max-w-sm">
        <p className="font-semibold">Pertanyaan {currentQuestion}</p>
        <h1 className="text-2xl font-bold mb-8 mt-4">
          {visibleQuestions[0]?.question}
        </h1>
      </div>

      <div className="grid grid-cols-2 font-bold gap-8">
        <div className="py-4 px-4 bg-red-600 rounded cursor-pointer">
          <div className="w-10 h-10 grid place-items-center rounded-full bg-white text-red-600">
            A
          </div>
          <div className="my-2">{visibleQuestions[0]?.options[0]}</div>
        </div>
        <div className="py-4 px-4 bg-blue-700 rounded cursor-pointer">
          <div className="w-10 h-10 grid place-items-center rounded-full bg-white text-blue-700">
            B
          </div>
          <div className="my-2">{visibleQuestions[0]?.options[1]}</div>
        </div>
        <div className="py-4 px-4 bg-green-700 rounded cursor-pointer">
          <div className="w-10 h-10 grid place-items-center rounded-full bg-white text-green-700">
            C
          </div>
          <div className="my-2">{visibleQuestions[0]?.options[2]}</div>
        </div>
        <div className="py-4 px-4 bg-pink-700 rounded cursor-pointer">
          <div className="w-10 h-10 grid place-items-center rounded-full bg-white text-pink-700">
            D
          </div>
          <div className="my-2">{visibleQuestions[0]?.options[3]}</div>
        </div>
      </div>
      <div className="mt-16 flex justify-between items-center place-items-center">
        <button
          onClick={handlePrevPage}
          disabled={isFirstQuestion}
          className="px-4 py-2 hover:bg-[#7B00C7] duration-300 cursor-pointer"
        >
          Previous
        </button>
        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#7B00C7] cursor-pointer"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNextPage}
            disabled={isLastQuestion}
            className="px-4 py-2 bg-[#7B00C7] cursor-pointer"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizContent;
