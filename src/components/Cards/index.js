import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Options from "../Options";
import "./style.css";

const Cards = () => {
  const history = useHistory();
  const [cards, setCards] = useState([]);

  const getPokemons = async () => {
    const response = await axios.get(
      "https://api.pokemontcg.io/v2/cards?pageSize=12"
    );
    setCards(response.data.data);
  };
  
  useEffect(() => {
    getPokemons();
  }, []);

  const cardRoute = (id) => {
    history.push(`/card/${id}`);
  };

  const searchCards = (e) => {
    const value = e.target.value.toLowerCase();
    if (value !== "") {
      setCards(
        cards.filter((pokemon) => {
          const pokemonName = pokemon.name.toLowerCase();
          if (pokemonName.includes(value)) return pokemon;
          else return null;
        })
      );
    } else {
      getPokemons();
    }
  };

  return (
    <>
      <Options searchCards={searchCards} />
      <div className="cardsWrapper">
        <div className="cards">
          {cards.map((pokemon) => {
            return (
              <div
                className="card"
                onClick={() => cardRoute(pokemon.id)}
                key={pokemon.id}
              >
                <h2>{pokemon.name}</h2>
                <img src={pokemon.images.large} alt={`${pokemon.name} city`} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Cards;
