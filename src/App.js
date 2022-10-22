import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pokedex/>}></Route>
        <Route path="/pokemon/:pokemonid" element={<Pokemon/>}></Route>
        <Route path="*" element={<ErrorPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
