import { MyButton } from "../components/MyButton";
import React, { useEffect, useState } from "react";
import "./Game.css";

export const Game = () => {
  const [pokemonData, setPokemonData] = useState<string>();
  const [text, setText] = useState<string>("test test");
  const [typing, setTyping] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [typo, setTypo] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      try {
        fetchPokemon();
      } catch (err) {
        console.error("Failed to fetch pokemon", err);
      }
    })();
  }, []);

  const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon-species";

  const fetchPokemon = async () => {
    const index = Math.floor(Math.random() * 151 + 1);
    const res = await fetch(`${pokeApiUrl}/${index}`);
    const result = await res.json();
    setPokemonData(result.names[0].name);
    return result;
  };

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
    <div>
      <div>{pokemonData || ""}</div>
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
    </div>
  );
};
