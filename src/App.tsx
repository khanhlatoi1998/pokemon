import { useEffect, useState } from 'react';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import { PokemonType } from './models/common';
import { Params } from './models/common';

import pokemonApi from './api/pokemonApi';

import PokemonList from './components/Pokemon/PokemonList';
import NotFound from './components/NotFound';
import PokemonDetail from './components/Pokemon/PokemonDetail';
import FormSearch from './components/FormSearch';

function App() {
    const [pokemons, setPokemons] = useState<PokemonType[]>([]); // không thể đặt trực tiếp giá trị vào được
    const [params, setParams] = useState<Params>({
        limit: 10, 
        offset: 0
    });
    const [loading, setLoading] = useState<boolean>(true);


    const fetchListPokemonApi = async () => {
        try {
            // const params = {
            //     limit: 10,
            //     offet: 0
            // }
            const response: any = await pokemonApi.getAll(params);
            return response;
        } catch (err) { return err; }
    };

    const fetchPokemonInfo = async (listPokemon: PokemonType[]) => {
        const newPokemon = listPokemon.map((p: PokemonType) => {
            const newpoke: any = pokemonApi.getId(p.name);
            return newpoke;
        });

        return Promise.all(newPokemon);
    };

    const clickLoadMore = async () => {
        setLoading(true);

        fetchListPokemonApi().then(async (data) => {
            const newParams = {
                limit: params.limit,
                offset: params.offset + 10
            }
            setParams(newParams);

            const response: any = await pokemonApi.getAll(newParams);
            const newListPokemon = response.results;

            fetchPokemonInfo(newListPokemon)
                .then((listPokemon: PokemonType[]) => {
                    setPokemons((p) => [...p, ...listPokemon]);
                    if(newListPokemon)
                        setLoading(false);
                }, (err) => {});

        }, (e) => {});
    };
    
    useEffect(() => {
        fetchListPokemonApi()
            .then((data) => {
                const listPokemon = data.results;

                fetchPokemonInfo(listPokemon)
                    .then((newListPokemon) => {
                        setPokemons(newListPokemon);
                        if(listPokemon)
                            setLoading(false);
                    }, (error) => {})
            }, (err) => {});
    }, []);

    return (
        <div className="App ">
            <div className="container">
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <>
                                <header className="pokemon-header"> Pokemon </header>
                                {/* <FormSearch /> */}
                                <PokemonList pokemons={pokemons} />
                                <button className="load--more" onClick={clickLoadMore}>{loading ? "loading..." : "Load more"}</button>
                            </>
                        } 
                    />
                    <Route path="detail/:paramsPokemon" element={<PokemonDetail />} >
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
