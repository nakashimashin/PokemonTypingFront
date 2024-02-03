import { useContext } from "react";
import { ScoreContext } from "../App";

export const Result = () => {
  const { state } = useContext(ScoreContext);
  return (
    <div>
      <div>Result</div>
      <div>Score: {state}</div>
    </div>
  );
};
