import "normalize.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Game } from "./pages/Game";
import { Result } from "./pages/Result";
import { createContext, useReducer } from "react";

type ContextType = {
  state: number;
  dispatch: React.Dispatch<Action>;
};

type Action = {
  type: "increment" | "decrement";
  score: number;
};

export const ScoreContext = createContext<ContextType>({
  state: 0,
  dispatch: () => {},
});

function App() {
  const initialState = 0;
  const reducer = (state: number, action: Action) => {
    switch (action.type) {
      case "increment":
        return state + action.score;
      case "decrement":
        return state - action.score;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <BrowserRouter>
        <ScoreContext.Provider value={{ state, dispatch }}>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </ScoreContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
