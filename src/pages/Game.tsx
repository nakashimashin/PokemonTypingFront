import { MyButton } from "../components/MyButton";
import { useEffect, useRef, useState } from "react";
import { toHiragana } from "wanakana";
import "./Game.css";

export const Game = () => {
  const [pokemonData, setPokemonData] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [text, setText] = useState<string>(" ");
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

  const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon-species";

  const fetchPokemon = async () => {
    const index = Math.floor(Math.random() * 151 + 1);
    const res = await fetch(`${pokeApiUrl}/${index}`);
    const result = await res.json();
    setPokemonData(result.names[0].name);
    setText(result.names[0].name);
    return result;
  };

  const typingToggle = () => {
    const newTypingState = !typing;
    setTyping(newTypingState);
    if (newTypingState && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const katakanaToHiragana = (str: string) => {
    return toHiragana(str);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = e.target.value;
    setInputValue(currentInputValue);

    if (!typing) return;

    let lastInputChar = currentInputValue.slice(-1);
    let expectedChar = text[position];
    let expectedHiragana = katakanaToHiragana(expectedChar); // カタカナからひらがなへ変換

    // 拗音をチェック
    if (
      ["ャ", "ュ", "ョ", "ォ", "ァ", "ィ", "ゥ", "ェ"].includes(
        text[position + 1]
      )
    ) {
      expectedChar += text[position + 1];
      expectedHiragana = katakanaToHiragana(expectedChar);
      if (currentInputValue.length > 1) {
        lastInputChar = currentInputValue.slice(-2);
      }
    }

    // 促音をチェック
    if (expectedChar === "ッ" && lastInputChar.length === 1) {
      expectedChar += text[position + 1].toLowerCase();
      expectedHiragana += katakanaToHiragana(text[position + 1]).toLowerCase();
      if (currentInputValue.length > 1) {
        lastInputChar = currentInputValue.slice(-2);
      }
    }

    console.log(`現在の入力: ${currentInputValue}`);
    console.log(`現在のポジション: ${position}`);
    console.log(`期待される文字 (カタカナ): ${expectedChar}`);
    console.log(`期待される文字 (ひらがな): ${expectedHiragana}`);
    console.log(`入力された最後の文字: ${lastInputChar}`);

    // ユーザー入力と期待される文字が一致するかどうかを確認
    if (lastInputChar === expectedChar || lastInputChar === expectedHiragana) {
      console.log("入力が期待される文字に一致しました");
      setPosition(position + expectedChar.length); // 拗音の場合、ポジションを2つ進める
      setInputValue(currentInputValue.slice(0, -expectedChar.length));
      if (position + expectedChar.length === text.length) {
        console.log("全ての文字が正しく入力されました");
        setTyping(false);
      }
    } else {
      console.log("入力が期待される文字と一致しませんでした");
      if (!typo.includes(position)) {
        setTypo([...typo, position]);
        console.log(`タイポが発生したポジション: ${position}`);
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
