import './App.css';
import{Route, BrowserRouter, Switch} from 'react-router-dom'
import Home from './pages/home/home.component';
import Detail from './pages/detail/detail.component';
import Create from './pages/create/create.component';
import Landing from './pages/landing/landing.component';


function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path = "/" component = {Landing}/>
      <Route exact path= "/home" component = {Home}/>
      <Route path= "home/:id" component = {Detail}/>
      <Route path= "/create" component = {Create}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
