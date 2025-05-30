import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/Auth/AuthContext";
import "./App.css"

function App() {

  const {user,token,signOut} = useContext(AuthContext);

  return (
      <BrowserRouter>
        <nav className="rotas">
          {token && 
          <>
            <Link to="/">Home</Link>
            <Link to="/perfil">Perfil</Link>
            <Link to="/eventos">Eventos</Link>
            <Link to="/login" onClick={signOut}>Sair</Link>
          </>
          }
          
        </nav>
        <AppRoutes/>
      </BrowserRouter>

  );
}

export default App;
