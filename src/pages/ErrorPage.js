import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>THIS IS AN ERROR PAGE</h1>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate("/")}>BACK TO POKEDEX</button>
    </>
  );
};

export default ErrorPage;
