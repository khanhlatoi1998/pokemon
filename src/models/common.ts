export interface PokemonType {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface Params {
  limit: number;
  offset: number;
}

export interface PokemonDetailType  extends PokemonType {
  abilities: {
    ability: {
      name: string;
    }
  }[] | undefined;
}