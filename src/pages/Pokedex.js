import React, { useEffect } from "react";
import { useState } from "react";
import mockData from "../mockData";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        })
        setPokemonData(newPokemonData);
      });
  }, []);

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <>
        {/**grid card item */}
        <div
          className="max-w-sm bg-white mx-10 my-4 rounded-lg border border-gray-200 shadow-md cursor-pointer dark:bg-white flex flex-col items-center "
          onClick={() => navigate(`/pokemon/${pokemonId}`)}
        >
          <div>
            {/**image */}
            <img
              src={sprite}
              className="rounded-t-lg mt-2"
              style={{ width: "130px", height: "130px" }}
            />
          </div>
          {/**name */}
          <div className="pt-5 capitalize">
            {id}. {name}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/**navbar */}
      <div className="sticky w-full h-[70px] flex justify-between items-center px-4 bg-sky-900 text-gray-300">
        {/**searchbar */}
        <div className="pt-2 relative ml-auto text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            onChange={handleSearchChange}
          ></input>
          <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
            <img src="https://img.icons8.com/ios-glyphs/20/000000/search--v1.png" />
          </button>
        </div>
      </div>

      {/**grid contaier */}
      {pokemonData ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-0">
          {Object.keys(pokemonData).map((pokemonId) =>
          pokemonData[pokemonId].name.includes(filter) &&
            getPokemonCard(pokemonId)
          )}
        </div>
      ) : (
        <div>
          <h1>Can't Load Data</h1>
        </div>
      )}
    </>
  );
};

export default Pokedex;
