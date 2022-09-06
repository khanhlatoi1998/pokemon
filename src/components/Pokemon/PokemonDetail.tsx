import { useState, useEffect } from "react";
import "./Pokemon.scss";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import pokemonApi from "../../api/pokemonApi";

import { PokemonType, PokemonDetailType } from "../../models/common";


import Pokemon from "./Pokemon";


// import pokemonApi from './api/pokemonApi';

interface Props {
    pokemon: PokemonType;
}

const PokemonDetail: React.FC = () => {
    const [pokemon, setGetPokemon] = useState<PokemonDetailType>();

    const { paramsPokemon } = useParams();
    const navigate = useNavigate();

    const closeDetail = () => {
        navigate("/")
    };


    useEffect(() => {
        const fetchPokemonDetail = async () => {
            const response: any = await pokemonApi.getId(paramsPokemon);

            return response;
        }

        fetchPokemonDetail().then((pokemon: PokemonDetailType) => {
            setGetPokemon(pokemon);
        }, (err) => {})

    }, []);


    return (
        <div className="pokemon__detail">
            <div className="pokemon__detail--block">
                <div className="pokemon__thumnail">
                    <div className="btn__close">
                        <button onClick={closeDetail}>X</button>
                    </div>
                    <div className="thumnail">
                        <img src={pokemon?.sprites.front_default} alt="" />
                        <p className="pokemon-name">{pokemon?.name}</p>
                    </div>

                </div>
                <div className="pokemon__detail--content">
                    {
                        pokemon?.abilities?.map((ab, index) => {
                            return (
                                <p key={index}>{ab?.ability.name}</p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default PokemonDetail;