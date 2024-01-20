import { MyButton } from "../components/MyButton";
import { useState } from "react";

export const Game = () => {
  const [typing, setTyping] = useState<boolean>(false);

  const typingToggle = () => {
    setTyping(typing ? false : true);
  };

  return (
    <div>
      <MyButton onClick={typingToggle}>{typing ? "OFF" : "ON"}</MyButton>
    </div>
  );
};
