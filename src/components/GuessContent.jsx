"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import LevelSelector from "./LevelSelector";
import Image from "next/image";
import Nyawa from "./GuessNyawa";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

const GuessContent = () => {
  const [dataSoal, setDataSoal] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [indexSoal, setIndexSoal] = useState(0);
  const [jawaban, setJawaban] = useState("");
  const [nyawa, setNyawa] = useState(3);
  const [completedLevels, setCompletedLevels] = useState([]);

  useEffect(() => {
    console.log(completedLevels);
    if (typeof window !== "undefined" && window.localStorage) {
      const completedLevelsFromStorage = JSON.parse(
        localStorage.getItem("completedLevels")
      );
      setCompletedLevels(completedLevelsFromStorage || []);
    }
  }, []);

  const handleJawabanChange = (e) => {
    setJawaban(e.target.value);
  };

  const handleSelectLevel = (level) => {
    console.log(completedLevels);
    const currentLevelIndex = parseInt(level.match(/\d+/)[0]);
    const previousLevelIndex = currentLevelIndex - 1;

    if (
      currentLevelIndex === 1 ||
      completedLevels.includes("level" + previousLevelIndex)
    ) {
      const audio = new Audio("/sound/start.mp3");
      audio.play();
      setSelectedLevel(level);
      setDataSoal(require(`../utils/soal.json`)[level]);
      setIndexSoal(0);
      setNyawa(3);
    } else {
      const audio = new Audio("/sound/wrong.mp3");
      audio.play();
      Swal.fire({
        title: "Level ini terkunci",
        text: "Silakan selesaikan level sebelumnya",
        icon: "warning",
      });
    }
  };

  const handleCorrectAnswer = () => {
    const isLastQuestion = indexSoal === dataSoal.length - 1;
    if (
      jawaban.toLocaleLowerCase() ===
      dataSoal[indexSoal].jawaban.toLocaleLowerCase()
    ) {
      const audio = new Audio(
        isLastQuestion ? "/sound/win.mp3" : "/sound/right.mp3"
      );
      audio.play();
      Swal.fire({
        title: isLastQuestion ? "Selamat Anda Menang!" : "Benar!",
        imageUrl: isLastQuestion ? "/confetti.gif" : "/good.gif",
        imageHeight: "200",
        confirmButtonText: "Lanjut",
      }).then(() => {
        setJawaban("");
        setSelectedLevel(isLastQuestion ? null : selectedLevel);
        setIndexSoal((prevIndex) =>
          isLastQuestion ? prevIndex : prevIndex + 1
        );

        if (isLastQuestion && !completedLevels.includes(selectedLevel)) {
          const updatedLevels = [...completedLevels, selectedLevel];
          setCompletedLevels(updatedLevels);
          localStorage.setItem(
            "completedLevels",
            JSON.stringify(updatedLevels)
          );
        }
      });
    } else {
      handleIncorrectAnswer();
    }
  };

  const handleIncorrectAnswer = () => {
    const audio = new Audio("/sound/wrong.mp3");
    audio.play();
    setNyawa((currentNyawa) => currentNyawa - 1);
  };

  useEffect(() => {
    if (nyawa === 0) {
      Swal.fire({
        title: "Game Over!",
        imageUrl: "/GameOver.gif",
        imageHeight: "200",
        confirmButtonText: "Kembali",
      }).then(() => {
        setJawaban("");
        setSelectedLevel(null);
      });
    }
  }, [nyawa]);

  return (
    <>
      {selectedLevel ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full min-h-screen flex justify-center items-center relative"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 absolute top-4 left-4 bg-[#20324E] text-white rounded-full flex place-items-center justify-center border-4 border-white"
            onClick={() => {
              setSelectedLevel(null);
              setJawaban("");
            }}
          >
            <IoIosArrowBack size={30} />
          </motion.button>
          <div className="bg-[#20324E] w-1/3 text-white h-full p-6 rounded">
            <div className="flex justify-between">
              <p className="font-semibold">Soal ke - {indexSoal + 1}</p>
              <Nyawa jumlahNyawa={nyawa} />
            </div>
            <h1 className="text-2xl font-bold mb-8 mt-2">
              Tebak Gambar Berikut Ini
            </h1>
            <div className="flex justify-center mb-8">
              <Image
                src={dataSoal[indexSoal].gambar}
                alt={`Tebak Gambar Soal Ke ${indexSoal}`}
                width={0}
                height={0}
                sizes="100vw"
                priority
                className="w-full h-auto rounded-md"
              />
            </div>
            <input
              type="text"
              name=""
              id=""
              value={jawaban}
              onChange={handleJawabanChange}
              placeholder="Ketik Jawaban Anda Disini..."
              className="w-full px-5 py-3 outline-none rounded-md text-black font-bold mb-4"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              className="w-full p-4 bg-blue-700 rounded font-bold duration-700 hover:bg-blue-600 relative z-10"
              onClick={handleCorrectAnswer}
            >
              Cek Jawaban
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <LevelSelector
          onSelectLevel={handleSelectLevel}
          completedLevels={completedLevels}
          jumlahNyawa={nyawa}
        />
      )}
    </>
  );
};

export default GuessContent;
