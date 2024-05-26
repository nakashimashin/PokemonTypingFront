import "normalize.css";
import { BrowserRouter} from "react-router-dom";
import { RouteConfig } from "./components/RouteConfig";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouteConfig />
      </BrowserRouter>
    </>
  );
}

export default App;
