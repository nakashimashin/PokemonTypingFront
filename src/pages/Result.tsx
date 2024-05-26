import { scoreStore } from "../store/scoreStore";
import { Button } from "../components/Button";

export const Result = () => {
  const score = scoreStore((state) => state.score);
  const correct = scoreStore((state) => state.correct);
  const skip = scoreStore((state) => state.skip);
  const reset = scoreStore((state) => state.reset);

  const handleResetScore = () => {
    reset();
  }
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="flex flex-col items-center h-1/2">
        <div className="text-[100px]">{score}ポイント</div>
        <div className="flex flex-row">
          <div className="text-[30px]">正解数: {correct}</div>
          <div className="text-[30px]">スキップ数: {skip}</div>
        </div>
        <div className="flex flex-row space-x-4">
          <Button url="/game" onClick={handleResetScore}>もう一回</Button>
          <Button url="/home" onClick={handleResetScore}>終了</Button>
        </div>
      </div>
    </div>
  );
};
