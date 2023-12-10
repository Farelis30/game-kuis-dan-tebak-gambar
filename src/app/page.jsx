"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Home = () => {
  const [variant, setVariant] = useState("quiz");

  const router = useRouter();

  return (
    <div className="w-full relative">
      <Image
        src="/BgImage.png"
        alt="BG Image"
        width={0}
        height={0}
        sizes="100vw"
        priority
        className="w-full h-auto absolute -z-10 object-cover "
      />
      <div className="w-11/12 mx-auto py-28">
        <h1 className="text-5xl text-white font-bold">
          Cerdas dalam Tantangan <br /> Kreatif dalam Tebakan
        </h1>
        <h2 className="mt-10 mb-16 text-base font-light text-white">
          Tantang Temanmu Siapa yang Lebih Cepat <br /> dalam Quiz dan Tebakan
          Gambar !!!
        </h2>
        <a
          href={variant === "quiz" ? "/quiz" : "/guess"}
          className="text-xl bg-[#FFBC42] px-8 py-2 font-bold cursor-pointer hover:bg-[#ffcb69] duration-300"
        >
          Let's Play
        </a>

        <div className="flex gap-8 mt-28">
          <motion.div
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}
            className="relative cursor-pointer"
            onClick={() => setVariant("quiz")}
          >
            <Image
              width={180}
              height={250}
              src={"/QuizImage.png"}
              alt="Test"
              className="rounded-xl w-48 h-auto"
            />
            <div className="absolute top-0 p-5">
              <h3 className="font-bold">Quiz</h3>
            </div>
            <div className="bg-black/0 hover:bg-black/10 duration-300 w-full h-full absolute top-0 rounded-xl grid place-items-center"></div>
            {variant === "quiz" ? (
              <div className="bg-black/30 w-full h-full absolute top-0 rounded-xl grid place-items-center">
                <div
                  className="w-20 h-20 rounded-full bg-white grid place-items-center font-bold"
                  onDoubleClick={() => router.push("/quiz")}
                >
                  <FaPlay />
                </div>
              </div>
            ) : (
              <></>
            )}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 1 }}
            className="relative cursor-pointer"
            onClick={() => setVariant("guess")}
          >
            <Image
              width={180}
              height={250}
              src={"/GuessImage.png"}
              alt="Test"
              className="rounded-xl w-48 h-auto"
            />
            <div className="absolute top-0 p-5">
              <h3 className="font-bold">Tebak Gambar</h3>
            </div>
            <div className="bg-black/0 hover:bg-black/10 duration-300 w-full h-full absolute top-0 rounded-xl grid place-items-center"></div>
            {variant === "guess" ? (
              <div className="bg-black/30 w-full h-full absolute top-0 rounded-xl grid place-items-center">
                <div
                  className="w-20 h-20 rounded-full bg-white grid place-items-center font-bold"
                  onDoubleClick={() => router.push("/guess")}
                >
                  <FaPlay />
                </div>
              </div>
            ) : (
              <></>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
