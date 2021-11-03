import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Card = () => {
  const { id } = useParams();
  const [myItem, setMyItem] = useState(null);

  const getPokemon = async () => {
    const response = await axios.get(
      `https://api.pokemontcg.io/v2/cards/${id}`
    );

    setMyItem(response.data.data);
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="cityWrapper">
      <div className="city">
        <h1>{myItem?.name}</h1>
        <img src={myItem?.images.large} alt={`${myItem?.name} city`} />
      </div>
    </div>
  );
};

export default Card;
