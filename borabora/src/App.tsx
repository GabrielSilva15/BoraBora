import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

import { useContext } from "react";
import { AuthContext } from "./contexts/Auth/AuthContext";
import "./App.css"


function App() {

  return (
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>

  );
}

export default App;
