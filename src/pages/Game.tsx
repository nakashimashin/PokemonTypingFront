import { MyButton } from "../components/MyButton";
import React, { useState } from "react";
import "./Game.css";

export const Game = () => {
  const [text, setText] = useState<string>("test test");
  const [typing, setTyping] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);

  const typingToggle = () => {
    setTyping(typing ? false : true);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (typing) {
      if (e.key === text[position]) {
        setPosition(position + 1);
      }
    }
  };

  return (
    <div onKeyDown={(e) => handleKey(e)} tabIndex={0}>
      <div>
        <span className="typed-letters">{text.slice(0, position)}</span>
        <span className="waiting-letters">{text.slice(position)}</span>
      </div>
      <MyButton onClick={typingToggle}>{typing ? "OFF" : "ON"}</MyButton>
    </div>
  );
};
