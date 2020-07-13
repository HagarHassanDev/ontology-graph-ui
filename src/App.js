import React, { Component } from "react";
import NavBar from './components/HeaderAndFooter/NavBar';
import Footer from './components/HeaderAndFooter/Footer';

import Concept from './components/Concept/Form';
import LO from './components/LO/Form';
import CreateOntology from './components/ontologyMain/CreateOntology';
import CreateDomain from './components/domain/CreateDomain';


import {BrowserRouter as Router , Route , Switch} from 'react-router-dom' ; 


class App extends Component {
    state = {};
    render() {
        return(
        <div>
           <NavBar/>
            <Router>
                <Switch>
                <Route exact path="/" component={Concept}/>
                    <Route  path="/concept" component={Concept}/>
                    <Route path="/lo" component={LO}/>
                    <Route path="/ontology" component={CreateOntology}/>
                    <Route path="/domain" component={CreateDomain}/>

                </Switch>

            </Router>
                    
            <Footer/>
        </div>)
    }
}
export default App;