import { PokemonType } from "../../models/common";
import {
    NavLink,
    useNavigate
} from "react-router-dom";

interface Props {
    pokemon: PokemonType;
}

const Pokemon: React.FC<Props> = (props) => {
    const { pokemon } = props;
    const navigate = useNavigate();

    const getDetail = () => {
        navigate(`/detail/${pokemon.name}`);
    };

    return (
        <div className="pokemon">
            <div className="pokemon__block" onClick={getDetail}>
                <p className="pokemon-name">{pokemon.name}</p>
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
        </div>
    );
}

export default Pokemon;