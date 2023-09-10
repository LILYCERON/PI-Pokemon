import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filters, getByName, getPokemons, getPokemonsByType, getTypes } from "../../redux/actions/index"
import Cards from '../../components/Cards/Cards.component';
import NavBar from '../../components/NavBar/NavBar.component';
import './home.styles.css';
import { useState } from 'react';
import Pagination from '../../components/Pagination/Pagination.component';

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.PokeCopy)
  const pokemonTypes = useSelector((state) => state.pokemonTypes)
  console.log("pokemonTypes: ", pokemonTypes)

  const [searchString, setSearchString] = useState("")

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const [orden, setOrden] = useState("");

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleChange(event) {
    event.preventDefault()
    setSearchString(event.target.value)
  }

  //filtro con el backend

  function handleSubmit(evento) {
    evento.preventDefault()
    dispatch(getByName(searchString))
  }

  const handleFilterByType = (e) => {
    e.preventDefault();
    dispatch(getPokemonsByType(e.target.value));
    setCurrentPage(1);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filters(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };

  /*//funcionalidades de la barra de busqueda:

  //Estado local que toma al estado global "allPokemons" como su estado inicial: 
  const [filtered, setFiltered]= useState(allPokemons) 

  // Estado local que corresponde al string que se escribe dentro del input de texto:
  const [searchString,setSearchString] = useState("") 

  //se crea una función que va a setear el string o palabra de busqueda a lo que es 
  //el target value del input de busqueda
  function handleChange(evento){
   evento.preventDefault() //para que la pag no se refresque
   setSearchString(evento.target.value)
  }

  //Cuando se da click en el botón del input, esta función hace un filtrado de todos los usuarios
  //con el nombre asignado dentro del input. Luego modifica el estado local de aquellos pokemons
  //que coincidieron con la busqueda:
  function handleSubmit(evento){
   evento.preventDefault()
   const filtered = allPokemons.filter((user) => user.name.includes(searchString))
   setFiltered(filtered)
  }*/

  /* useEffect(() => { dispatch(getPokemons()) dispatch(getTypes())}, [dispatch]); */

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    
  }, []);

  return (
    <div className='home'>
      <h2 className='home-title'>You're at home</h2>
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      <section >
        <button /* onClick={(e) => handleFilterByName(e)} */>
            Reset Filters
          </button>

        <a href="/create">
          <button>Create Pokemon</button>
        </a>
        <div >
          <select
            id="1"
            defaultValue="Select Filter:"
            onChange={(e) => handleFilter(e)}
          >
            <option key='0' value="Select Filter:" disabled>
            Select Filter:
            </option>
            <option key='1' disabled>By source</option>
            <option key='2' value="All">All</option>
            <option key='3' value="created">Db</option>
            <option key='4' value="api">Api</option>
            <option key='5' disabled>Alphabetical</option>
            <option key='6' value="asc">A - Z</option>
            <option key='7' value="desc">Z - A</option>
            <option key='8' disabled>By Attack</option>
            <option key='9' value="ascp">Upward</option>
            <option key='10' value="descp">Falling</option>
          </select>
        </div>
        <div>
          <select
            id="2"
            defaultValue="Select Type:"
            onChange={(e) => handleFilterByType(e)}
          >
            <option key='dis' value="Select Type:" disabled>
              Select Type:
            </option>
            {pokemonTypes.map((pokemonType) => (
              <option key={pokemonType} value={pokemonType}>{pokemonType}</option>
            ))}
          </select>
        </div>
      </section>
      <div>
        {allPokemons.length > 12 ? (
          <Pagination
            pokemonsAll={allPokemons.length}
            pokemonsPerPage={pokemonsPerPage}
            pagination={pagination}
          />
        ) : null}
      </div>
      <Cards allPokemons={currentPokemons} />
    </div>
  );
}

export default Home;
