import "./landing.styles.css"

/*function Landing(){
    return(
        <div className="landing">
            <h1>Welcome to PokemonApi</h1>
        </div>
    )
}

export default <Landing>*/  

import React from 'react';

function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <h1>Bienvenido a la Página de Pokémon</h1>
        <p>Descubre el emocionante mundo de los Pokémon.</p>
        <a href="/home">Comenzar</a>
      </header>
      <section className="Contact">
        <h2>Contacto</h2>
        <p>Ponte en contacto con nosotros para obtener más información.</p>
        <a href="mailto:info@example.com">Enviar un correo electrónico</a>
      </section>
      <footer className="Footer">
        <p>&copy; 2023 Pokémon Company</p>
      </footer>
    </div>
  );
}

export default Landing;
