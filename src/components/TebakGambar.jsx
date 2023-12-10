"use client";
import React, { useState, useEffect } from "react";

const TebakGambar = () => {
  const [dataSoal, setDataSoal] = useState([
    { gambar: "https://example.com/gambar1.jpg", jawaban: "Kereta Api" },
    { gambar: "https://example.com/gambar2.jpg", jawaban: "Kuliah" },
    { gambar: "https://example.com/gambar3.jpg", jawaban: "Meja Bundar" },
    { gambar: "https://example.com/gambar4.jpg", jawaban: "Sate Ayam" },
    { gambar: "https://example.com/gambar5.jpg", jawaban: "Bantal Guling" },
    // ... tambahkan soal dan jawaban berikutnya
  ]);

  const [indexSoal, setIndexSoal] = useState(0);
  const [jawaban, setJawaban] = useState("");
  const [nyawa, setNyawa] = useState(3);
  const [menang, setMenang] = useState(false);
  const [tampilTombolLanjut, setTampilTombolLanjut] = useState(false);

  const handleJawabanChange = (e) => {
    setJawaban(e.target.value);
  };

  const validasiJawaban = () => {
    if (jawaban.toLowerCase() === dataSoal[indexSoal].jawaban.toLowerCase()) {
      if (indexSoal === dataSoal.length - 1) {
        setMenang(true); // Menang setelah menjawab semua soal
      } else {
        setIndexSoal((prevIndex) => prevIndex + 1);
        setJawaban("");
        setTampilTombolLanjut(true);
      }
    } else {
      setNyawa((prevNyawa) => prevNyawa - 1);
    }
  };

  const handleLanjut = () => {
    // Reset komponen untuk soal berikutnya
    setIndexSoal((prevIndex) => prevIndex + 1);
    setJawaban("");
    setMenang(false);
    setTampilTombolLanjut(false);
  };

  useEffect(() => {
    if (nyawa === 0) {
      alert("Game Over!");
    }
  }, [nyawa]);

  const Nyawa = ({ jumlahNyawa }) => {
    const nyawaElements = Array.from({ length: jumlahNyawa }, (_, index) => (
      <p key={index}>I</p>
    ));

    return <div>{nyawaElements}</div>;
  };

  return (
    <div>
      <img src={dataSoal[indexSoal].gambar} alt="Tebak Gambar" />
      {tampilTombolLanjut ? (
        <></>
      ) : (
        <input type="text" value={jawaban} onChange={handleJawabanChange} />
      )}
      {menang ? (
        <p>Selamat, Anda Menang!</p>
      ) : (
        <>
          {tampilTombolLanjut ? (
            <button onClick={handleLanjut}>Lanjut</button>
          ) : (
            <>
              <button onClick={validasiJawaban}>Submit Jawaban</button>
              <p>Nyawa: {nyawa}</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TebakGambar;
