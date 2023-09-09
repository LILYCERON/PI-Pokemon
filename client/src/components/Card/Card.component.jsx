import './Card.styles.css';

function Card({Pok}) {
    const {name, type, image} = Pok
    return (
        <div className="card-container">
            <ul>
                <img src={image} style={{ width: '200px', height: 'auto'}} />
                <h2>{name}</h2>
                <h2>{type}</h2>
            </ul>
        </div>
    );
}

export default Card;
