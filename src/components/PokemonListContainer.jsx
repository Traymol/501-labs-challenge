import './PokemonListContainer.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PokemonListContainer = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonCount, setPokemonCount] = useState(8);


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getColorByType = (type) => {
        switch (type) {
            case 'fire':
                return '#f08030';
            case 'water':
                return '#6890f0';
            case 'grass':
                return '#78c850';
            case 'bug':
                return '#a8b820';
            case 'flying':
                return 'mediumpurple';
            case 'poison':
                return '#bb7be3';
            case 'ground':
                return '#e0c068';
            case 'rock':
                return '#b8a038';
            case 'electric':
                return 'gold';
            case 'psychic':
                return '#f85888';
            case 'ice':
                return '#98d8d8';
            case 'fighting':
                return '#c03028';
            case 'dragon':
                return '#7038f8';
            case 'fairy':
                return '#ee99ac';
            case 'ghost':
                return 'slategray';
            case 'dark':
                return 'dimgray';
            case 'steel':
                return 'silver';
            default:
                return 'darkkhaki';
        }
    };

    const pokedex = (id) => {
        if (id <= 9) {
            return `#000${id}`;
        } else if (id >= 10 & id < 100) {
            return `#00${id}`;
        } else if (id >= 100) {
            return `#0${id}`;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${pokemonCount}`);
            const data = await response.json();

            const pokemonDetails = await Promise.all(
                data.results.map(async (pokemon) => {
                    const detailsResponse = await fetch(pokemon.url);
                    if (!detailsResponse.ok) {
                        throw new Error('Error al obtener los detalles del Pokémon');
                    }
                    const detailsData = await detailsResponse.json();

                    const { id, name, sprites, types } = detailsData;
                    const pokemonInfo = {
                        id,
                        name,
                        image: sprites.front_default,
                        types: types.map((type) => type.type.name),
                    };

                    return pokemonInfo;
                })
            );

            setPokemonList(pokemonDetails);
        };

        fetchData();
    }, [pokemonCount]);

    const handleLoadMore = () => {
        setPokemonCount((prevCount) => prevCount + 8);
    };

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);
    };    

    const filteredPokemonList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='body'>
            <h2>Lista de Pokémon</h2>
            <input
                className='searcher'
                type="text"
                placeholder="Buscar pokémon por nombre..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul className="pokemonList">
                {filteredPokemonList.map((pokemon, index) => (
                    <Link to={`/pokemon/${pokemon.id}`} key={index}>
                        <li className="pokemonItem">
                            <img src={pokemon.image} alt={`Imagen de ${pokemon.name}`} />
                            <p className='pokedex'>{pokedex(pokemon.id)}</p>
                            <p className='pokemonName'>{capitalizeFirstLetter(pokemon.name)}</p>
                            <p className='pokemonType' style={{ backgroundColor: getColorByType(pokemon.types[0]) || 'gray' }}> {capitalizeFirstLetter(pokemon.types[0])}
                                {pokemon.types.length > 1 ? ` ${capitalizeFirstLetter(pokemon.types[1])}` : ''}  </p>
                        </li>
                    </Link>
                ))}
            </ul>
            <div>
                <button className='loadMoreButton' onClick={handleLoadMore}>Cargar más</button>
            </div>
        </div>
    );
};

export default PokemonListContainer;
