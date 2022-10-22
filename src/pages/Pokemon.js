import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";
import axios from "axios";

const Pokemon = () => {
  const navigate = useNavigate();
  const { pokemonid } = useParams();
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonid}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonid]);

  const generatePokemonJSX = () => {

    const { name, id, species, height, weight, types, sprites } = pokemon;
    const padId = id;
    function paddedId() {

      if (padId <= 9){
        const result = "00" + padId;
        return result 
      }
      else if (padId <= 99){
        const result = "0" + padId;
        return result 
      }
      else if (padId <= 808){
        const result = padId;
        return result 
      }
    }

    
    const fullImageUrl = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${paddedId()}.png`;
    const back_default = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
    


    return (
      <>
        <div className="flex justify-center text-center my-32">
          <div className="max-w-sm bg-white mx-10 my-4 rounded-lg border border-gray-200 shadow-md dark:bg-white flex flex-col items-center p-10">
            <div className="flex">
              <img
                src={fullImageUrl}
                style={{ height: "150px", width: "150px" }}
              ></img>
              <img
                className="mt-auto"
                src={back_default}
                style={{ height: "75px", width: "75px" }}
              ></img>
            </div>
            <div className="capitalize">
              <h2 className="text-4xl">Pokemon Info</h2>
              <p>ID: #{id}</p>
              <p>Name: {name}</p>
              <p>Height: {height}</p>
              <p>Weight: {weight}</p>
              <h2 className="text-2xl">Types:</h2>
              {types.map((typeInfo) => {
                const { type } = typeInfo;
                const { name } = type;
                return <p key={name}> {`${name}`}</p>;
              })}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
              onClick={() => navigate("/")}
            >
              BACK TO POKEDEX{" "}
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <div>Please Wait</div>}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <ErrorPage />}
    </>
  );
};

export default Pokemon;
