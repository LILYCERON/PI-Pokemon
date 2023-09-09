import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postPokemon } from '../../redux/actions';

const PokemonForm = () => {

    const dispatch = useDispatch();
    
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    life: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    /* types: [], */
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* const handleTipoChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      types: formData.types.includes(value)
        ? formData.types.filter((tipo) => tipo !== value)
        : [...formData.types, value],
    });
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData',formData);
    dispatch(postPokemon(formData)) 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Imagen:</label>
        <input type="text" name="image" value={formData.image} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Vida:</label>
        <input type="number" name="life" value={formData.life} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Ataque:</label>
        <input type="number" name="attack" value={formData.attack} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Defensa:</label>
        <input type="number" name="defense" value={formData.defense} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Velocidad:</label>
        <input type="number" name="speed" value={formData.speed} onChange={handleInputChange} />
      </div>
      <div>
        <label>Altura:</label>
        <input type="number" name="height" value={formData.height} onChange={handleInputChange} />
      </div>
      <div>
        <label>Peso:</label>
        <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} />
      </div>
      {/* <div>
        <label>Tipos:</label>
        <select multiple name="types" value={formData.types} onChange={handleTipoChange}>
          <option value="fuego">Fuego</option>
          <option value="agua">Agua</option>
          <option value="planta">Planta</option>
          <option value="electrico">Eléctrico</option>
        </select>
      </div> */}
      <button type="submit">Crear Pokémon</button>
    </form>
  );
};

export default PokemonForm;
