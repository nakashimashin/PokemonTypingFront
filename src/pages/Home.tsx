import { Button } from "../components/Button";

export const Home = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="h-1/2 max-h-[400px] flex flex-col items-center">
        <h1 className="text-[120px] mb-5">PokeTyping</h1>
        <Button url="/game">Start</Button>
      </div>
    </div>
  );
};
