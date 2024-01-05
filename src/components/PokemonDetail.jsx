import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './PokemonDetail.css'

const PokemonDetail = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    const capitalizeFirstLetter = (string) => {
        return string.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const getColorByType = (type) => {
        console.log('Tipo:', type);
        switch (type) {
            case 'Fire':
                return '#f08030';
            case 'Water':
                return '#6890f0';
            case 'Grass':
                return '#78c850';
            case 'Bug':
                return '#a8b820';
            case 'Flying':
                return 'mediumpurple';
            case 'Poison':
                return '#bb7be3';
            case 'Ground':
                return '#e0c068';
            case 'Rock':
                return '#b8a038';
            case 'Electric':
                return 'gold';
            case 'Psychic':
                return '#f85888';
            case 'Ice':
                return '#98d8d8';
            case 'Fighting':
                return '#c03028';
            case 'Dragon':
                return '#7038f8';
            case 'Fairy':
                return '#ee99ac';
            case 'Ghost':
                return 'slategray';
            case 'Dark':
                return 'dimgray';
            case 'Steel':
                return 'silver'
            default:
                return 'darkkhaki';
        }
    };

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const capitalizedTypes = data.types.map((type) =>
                    capitalizeFirstLetter(type.type.name)
                );
                setPokemon({
                    name: capitalizeFirstLetter(data.name),
                    height: data.height / 10,
                    weight: data.weight / 10,
                    types: capitalizedTypes,
                    image: data.sprites.front_default,
                    stats: data.stats.map((stat) => ({
                        name: capitalizeFirstLetter(stat.stat.name),
                        value: stat.base_stat,
                    })),
                });
            })
            .catch((error) => {
                console.error('Error al obtener los detalles del Pokémon:', error);
            });
    }, [id]);

    if (!pokemon) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Link to={'/'}>
                <button className='backButton' >Volver</button>
            </Link>
            <div className="pokemonDetail">
                <h1>{pokemon.name}</h1>
                <div className='imgStats' >
                    <img
                        src={pokemon.image}
                        alt={`Imagen de ${pokemon.name}`}
                    />
                    <div className='stats'>
                        <div className='heightWeight'>
                            <p><strong>Altura:</strong> {pokemon.height}m</p>
                            <p><strong>Peso:</strong> {pokemon.weight}kg</p>
                        </div>
                        <div className='type'>
                            <p >Tipo/s:</p>
                            <p className='types' style={{ backgroundColor: getColorByType(pokemon.types[0]) || 'gray' }}>{pokemon.types.join(' ')}</p>
                        </div>
                        <h2>Estadísticas</h2>
                        <ul>
                            <li>HP: {pokemon.stats[0].value}</li>
                            <li>Ataque: {pokemon.stats[1].value}</li>
                            <li>Defensa: {pokemon.stats[2].value}</li>
                            <li>Ataque Especial: {pokemon.stats[3].value}</li>
                            <li>Defensa Especial: {pokemon.stats[4].value}</li>
                            <li>Velocidad: {pokemon.stats[5].value}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Link to={`/pokemon/${Math.max(1, parseInt(id, 10) - 1)}`}>
                <button className='prevButton'>Anterior</button>
            </Link>
            <Link to={`/pokemon/${parseInt(id, 10) + 1}`}>
                <button className='nextButton'>Siguiente</button>
            </Link>
        </>
    );
};

export default PokemonDetail;
