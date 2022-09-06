import Pokemon from "./Pokemon";
import { PokemonType } from '../../models/common';
import "./Pokemon.scss";
import "../../styles/global.scss";

interface Props {
    pokemons: PokemonType[]
}

// Generris chỉ nhận prototype of array 
interface List<T> {
    length: number;
    [index: number]: T;
}

const numberList: List<number> = [1, 3, 4];

const PokemonList: React.FC<Props> = (props) => {
    const { pokemons } = props;
    return (
        <div className="pokemon__list">
            {
                pokemons.map((pokemon) => {
                    return (
                        <Pokemon  key={pokemon.id} pokemon={pokemon}/>
                    )
                })
            }
        </div>
    );
}

export default PokemonList;