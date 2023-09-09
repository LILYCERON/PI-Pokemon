import './Navbar.styles.css'

function NavBar({handleChange, handleSubmit}){
    return(
        <div  className="search-box">
           <form onChange = {handleChange}>
            <input placeholder='Busqueda' type= "search" /> 
            <button type="submit" onClick={handleSubmit}>Buscar</button>
           </form>
        </div>
    )
}

export default NavBar;