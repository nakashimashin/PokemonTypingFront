import { useState } from "react";
import { CountDown } from "../hooks/CountDown";

export const Timer = () => {
  const [countTime, setCountTime] = useState<number>(60);
  CountDown(countTime, setCountTime);
  return (
    <p>
      ゲーム残り時間: {Math.floor(countTime / 60)}分{countTime % 60}秒{" "}
    </p>
  );
};
