import { MyButton } from "../components/MyButton";
import React, { useState } from "react";
import "./Game.css";

export const Game = () => {
  const [text, setText] = useState<string>("test test");
  const [typing, setTyping] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [typo, setTypo] = useState<number[]>([]);

  const typingToggle = () => {
    setTyping(!typing);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!typing) return;

    if (e.key === " ") {
      e.preventDefault();
    }

    if (e.key === text[position]) {
      setPosition(position + 1);
      if (position === text.length - 1) {
        setTyping(false);
      }
    } else {
      if (!typo.includes(position)) {
        setTypo([...typo, position]);
      }
    }
  };

  return (
    <div onKeyDown={handleKey} tabIndex={0}>
      <div id="textbox">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={
              index < position
                ? "typed-letters"
                : typo.includes(index)
                  ? "typo"
                  : index === position
                    ? "current-letter"
                    : "waiting-letters"
            }
          >
            {char}
          </span>
        ))}
      </div>
      <MyButton onClick={typingToggle}>{typing ? "OFF" : "ON"}</MyButton>
    </div>
  );
};
