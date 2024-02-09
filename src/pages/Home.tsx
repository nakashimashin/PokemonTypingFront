import { Button } from "../components/Button";
import "./Home.css";

export const Home = () => {
  return (
    <div className="body">
      <h1>Home</h1>
      <Button url="/game">Start</Button>
    </div>
  );
};
