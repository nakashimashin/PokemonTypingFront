import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Game } from "./pages/Game";
import { Result } from "./pages/Result";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
