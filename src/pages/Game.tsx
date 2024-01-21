import { MyButton } from "../components/MyButton";
import React, { useEffect, useState } from "react";
import "./Game.css";

export const Game = () => {
  const [pokemonData, setPokemonData] = useState<any>([]);
  const [text, setText] = useState<string>("test test");
  const [typing, setTyping] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [typo, setTypo] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      try {
        let res: any = await getPokemon(pokeApiUrl);
        loadPokemon(res.results);
      } catch (err) {
        console.error("Failed to fetch pokemon", err);
      }
    })();
  }, []);

  const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/";

  const getPokemon = (url: string) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const loadPokemon = async (data: any) => {
    let _pokemonData: any = await Promise.all(
      data.map((pokemon: any) => {
        let pokemonrecord = getPokemon(pokemon.url);
        return pokemonrecord;
      })
    );
    setPokemonData(_pokemonData);
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
      <div>
        {pokemonData.map((pokemon: any, i: number) => {
          return <p key={i}>{pokemon.name}</p>;
        })}
      </div>
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
