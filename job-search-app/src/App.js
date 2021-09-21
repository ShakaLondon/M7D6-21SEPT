import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavJobs from "../src/Components/Navbar.jsx"
import SearchJobs from "../src/Components/Search-Bar.jsx"
import ResultList from "../src/Components/Job-List.jsx"
import CompanyJobs from "../src/Components/Company-Jobs.jsx"
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStore from './Redux/Store/store.js'

function App() {
  return (
    <Provider store={configureStore}>
      <div style={{height: "100vh"}}>
        
        <BrowserRouter>
        <NavJobs/>
          <Switch>
              <Route exact path="/Search" component={SearchJobs}/>
              <Route exact path="/">
                <Redirect to="/Search"/>
              </Route>
              <Route exact path="/Results" component={ResultList}/>
              <Route exact path="/Company" component={CompanyJobs}/>
              <Route exact path="/Favourites" component={ResultList}/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
