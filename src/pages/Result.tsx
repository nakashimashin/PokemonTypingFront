import { useContext } from "react";
import { ScoreContext } from "../App";
import { Button } from "../components/Button";

export const Result = () => {
  const { state } = useContext(ScoreContext);
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="flex flex-col items-center h-1/2">
        <div className="text-[100px]">{state}ポイント</div>
        <div className="flex flex-row space-x-4">
          <Button url="/game">もう一回</Button>
          <Button url="/home">終了</Button>
        </div>
      </div>
    </div>
  );
};
