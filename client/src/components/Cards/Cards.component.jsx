import './Cards.styles.css';
import Card from '../Card/Card.component';

function Cards({ allPokemons }) {
  console.log(allPokemons)

  const pokeList = allPokemons
  console.log(pokeList)

  return (
    <div className = "cards-list">
      {pokeList?.map((Pok) =>
        <Card  Pok = {Pok}/>)
      }
    </div>
  );
}

export default Cards;
