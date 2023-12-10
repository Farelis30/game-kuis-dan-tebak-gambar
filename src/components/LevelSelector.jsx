import React from "react";
import Image from "next/image";
import Nyawa from "./GuessNyawa";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LevelSelector = ({ onSelectLevel, jumlahNyawa }) => {
  const levels = ["level1", "level2", "level3", "level4"];

  const router = useRouter();

  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      <div className="w-full h-screen absolute top-0 left-0 bg-black/10 z-10"></div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 absolute top-4 left-4 bg-[#20324E] text-white rounded-full flex place-items-center justify-center border-4 border-white z-20"
        onClick={() => router.push("/")}
      >
        <IoIosArrowBack size={30} />
      </motion.button>
      <Image
        src="/TebakGambar.png"
        alt="BG Image"
        width={0}
        height={0}
        sizes="100vw"
        priority
        className="w-full h-screen absolute object-cover object-top"
      />
      <div className="w-1/2 z-40">
        <h2 className="text-2xl text-white font-bold text-center mb-8">
          Select Level Game
        </h2>
        <div className="grid grid-cols-2 gap-10">
          {levels.map((level, index) => (
            <motion.button
              whileHover={{ border: 0 }}
              whileTap={{ scale: 0.8 }}
              className="w-full bg-[#0D0C1D] border-4 border-white rounded text-white py-3 flex flex-col items-center"
              key={index}
              onClick={() => {
                onSelectLevel(level);
              }}
            >
              <h1 className="mb-3 font-bold text-2xl">Level</h1>
              <h2 className="font-bold text-3xl">{index + 1}</h2>
            </motion.button>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Nyawa jumlahNyawa={jumlahNyawa} />
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;
