"use client";
import { useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    // if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying); // меняем состояние
  };

  return (
    <div className="flex items-center p-[5px] bg-[#ffffff] rounded-full">
      <audio ref={audioRef} src="/Audio/Miside.m4a" loop className="w-[300px]"/>
      <img onClick={toggleAudio} className="w-[20px] h-[20px] cursor-pointer" src={isPlaying ? "https://img.icons8.com/ios/50/pause--v1.png" : "https://img.icons8.com/ios/50/play--v1.png"} alt={isPlaying ? "Pause" : "Play"}/>
    </div>
  );
}
