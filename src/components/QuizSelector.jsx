import React from "react";

const QuizSelector = ({ currentQuestion, setCurrentQuestion }) => {
  const renderNumberButton = (number) => (
    <div
      key={number}
      className={`rounded-full w-10 h-10 ${
        currentQuestion === number
          ? "bg-[#7B00C7] text-white"
          : "bg-[#EFE5DC] text-[#1B263B]"
      } grid place-items-center text-sm cursor-pointer`}
      onClick={() => setCurrentQuestion(number)}
    >
      {number}
    </div>
  );

  return (
    <div className="bg-[#20324E] text-white w-1/3 h-1/3 m-3 p-6 rounded">
      <p className="text-sm font-extralight mb-1">The Battle Commences</p>
      <h1 className="text-xl font-bold mb-3">
        Siapa Yang Akan Menjadi Juara? <br />
        <span className="text-base">
          Ayo Ikuti Quiz Kami dan Temukan Jawabannya
        </span>
      </h1>
      <div className="flex flex-wrap gap-y-3 gap-x-2 my-2 w-3/4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(renderNumberButton)}
      </div>
    </div>
  );
};

export default QuizSelector;
