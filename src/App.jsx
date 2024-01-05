import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PokemonDetail from './components/PokemonDetail'
import PokemonListContainer from './components/PokemonListContainer'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<PokemonListContainer />} />
                <Route exact path='/pokemon/:id' element={<PokemonDetail />} />
            </Routes>
        </Router>
    )
}

export default App