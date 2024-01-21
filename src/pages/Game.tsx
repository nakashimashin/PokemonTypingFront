import { MyButton } from "../components/MyButton";
import { useEffect, useRef, useState } from "react";
import "./Game.css";

export const Game = () => {
  const [pokemonData, setPokemonData] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [text, setText] = useState<string>("ふシギバナ");
  const [typing, setTyping] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [typo, setTypo] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (!isLoaded) {
      (async () => {
        try {
          await fetchPokemon();
          setIsLoaded(true);
        } catch (err) {
          console.error("Failed to fetch pokemon", err);
        }
      })();
    }
  }, [isLoaded]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [typing]);

  const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon-species";

  const fetchPokemon = async () => {
    const index = Math.floor(Math.random() * 151 + 1);
    const res = await fetch(`${pokeApiUrl}/${index}`);
    const result = await res.json();
    setPokemonData(result.names[0].name);
    // setText(result.names[0].name);
    return result;
  };

  const typingToggle = () => {
    setTyping(!typing);
  };

  const katakanaToHiragana = (str: string) => {
    return str.replace(/[\u30a1-\u30f6]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = e.target.value;
    setInputValue(currentInputValue);

    if (!typing) return;

    const lastInputChar = currentInputValue.slice(-1);
    const expectedChar = text[position];

    if (
      lastInputChar === expectedChar ||
      lastInputChar === katakanaToHiragana(expectedChar)
    ) {
      setPosition(position + 1);
      setInputValue(currentInputValue.slice(0, -1));
      if (position + 1 === text.length) {
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
      <div>{pokemonData}</div>
      <div tabIndex={0}>
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
        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          ref={inputRef}
          style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
        />
        <MyButton onClick={typingToggle}>{typing ? "OFF" : "ON"}</MyButton>
      </div>
    </div>
  );
};
