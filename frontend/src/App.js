//@ts-check
import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Map from './components/map/PolygonMap';
import Home from "./components/Home.js";
import Navbar from "./components/Navbar.js";
import AddImage from "./components/AddImage.js";
import ErrorPage from "./components/Error.js";

import './App.css';

// import ErrorPage from "./Error.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
              <Navbar/>
              <Route path="/" component={Home} exact />
              <Route path="/map" component={Map} exact/>
              <Route path="/add-image" component={AddImage} exact />
              <Route  component={ErrorPage}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}



export default App;
