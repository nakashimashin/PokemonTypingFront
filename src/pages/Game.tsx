import { useEffect, useRef, useState} from "react";
import { toHiragana } from "wanakana";
import { Timer } from "../components/Timer";
import { scoreStore } from "../store/scoreStore";

export const Game = () => {
  const [pokemonData, setPokemonData] = useState<string>();
  const [pokemonImage, setPokemonImage] = useState<string>();
  const [text, setText] = useState<string>(" ");
  const [position, setPosition] = useState<number>(0);
  const [typo, setTypo] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { increment, decrement, incrementCorrect, incrementSkip, reset } = scoreStore();


  const fetchPokemon = async () => {
    try {
      const index = Math.floor(Math.random() * 640 + 1);
      const res = await fetch(`${pokeApiUrl}/${index}`);
      const result = await res.json();
      const pokemonName = result.names[0].name;
      setPokemonData(pokemonName);
      setText(pokemonName);
      const url = result.varieties[0].pokemon.url;
      const imageRes = await fetch(url);
      const imageResult = await imageRes.json();
      const image = imageResult.sprites.front_default;
      setPokemonImage(image);
    } catch (err) {
      console.error("Failed to fetch pokemon", err);
    }
  };


  useEffect(() => {
    const initializeGame = async () => {
      reset();
      if (inputRef.current) {
        inputRef.current.focus();
      }
      await fetchPokemon();
    };
    initializeGame();
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon-species";

  const katakanaToHiragana = (str: string) => {
    return toHiragana(str);
  };

  const fetchNewPokemon = async () => {
    setPosition(0);
    setTypo([]);
    setInputValue("");
    await fetchPokemon();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      decrement(1);
      incrementSkip();
      fetchNewPokemon();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = e.target.value;
    setInputValue(currentInputValue);

    let lastInputChar = currentInputValue.slice(-1);
    let expectedChar = text[position];
    let expectedHiragana = katakanaToHiragana(expectedChar);

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

    // ユーザー入力と期待される文字が一致するかどうかを確認
    if (lastInputChar === expectedChar || lastInputChar === expectedHiragana) {
      setPosition(position + expectedChar.length); // 拗音の場合、ポジションを2つ進める
      setInputValue(currentInputValue.slice(0, -expectedChar.length));
      if (position + expectedChar.length === text.length) {
        increment(1);
        incrementCorrect();
        fetchNewPokemon();
      }
    } else {
      if (!typo.includes(position)) {
        setTypo([...typo, position]);
      }
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        {/* <div>{pokemonData}</div> */}
        <img src={pokemonImage} className="bg-white w-[200px] h-[200px] mb-3" />
        <div tabIndex={0}>
          <div id="textbox">
            {text.split("").map((char, index) => (
              <span
                key={index}
                className={
                  index < position ? "text-black text-[30px]" : "text-[0px]"
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
            onKeyDown={handleKeyDown}
            ref={inputRef}
            style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
          />
        </div>
        <Timer />
        <div>Enterキーでスキップ</div>
      </div>
    </div>
  );
};
