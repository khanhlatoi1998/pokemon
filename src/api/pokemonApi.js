import axiosClient from "./axiosApi";
import { PokemonType } from "../models/common";

const pokemonApi = {
    getAll: (params) => {
        let url = './pokemon';
        return axiosClient.get(url, { params });
    },
    getId: (id) => {
        let url = `./pokemon/${id}`;
        return axiosClient.get(url);
    },
};

export default pokemonApi;