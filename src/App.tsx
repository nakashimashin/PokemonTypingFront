import "normalize.css";
import { BrowserRouter} from "react-router-dom";
import { createContext, useReducer } from "react";
import { RouteConfig } from "./components/RouteConfig";

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
          <RouteConfig />
        </ScoreContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
