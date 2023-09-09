import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getPokemons, getTypes } from "../../redux/actions/index"
import Cards from '../../components/Cards/Cards.component';
import NavBar from '../../components/NavBar/NavBar.component';
import './home.styles.css';
import { useState } from 'react';

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.Pokemons)
  const [searchString, setSearchString] = useState("")

  function handleChange(event) {
    event.preventDefault()
    setSearchString(event.target.value)
  }

  //filtro con el backend

  function handleSubmit(evento) {
    evento.preventDefault()
    dispatch(getByName(searchString))
  }

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
      <Cards allPokemons={allPokemons} />
    </div>
  );
}

export default Home;
