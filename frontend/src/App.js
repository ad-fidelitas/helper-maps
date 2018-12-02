//@ts-check
import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Map from './components/map/PolygonMap';
import Home from "./components/Home.js";
import Navbar from "./components/Navbar.js";
import AddImage from "./components/AddImage.js";
import ErrorPage from "./components/Error.js";
import About from "./components/about/about.js";
import Footer from "./components/footer.js";
import './App.css';
// import ErrorPage from "./Error.jsx";

// let imgUrl = bkrgnd
// var sectionStyle = {
//   width: "100%",
//   height: "400px",
//   backgroundImage: 'url(' + imgUrl + ')', 
// };


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
              <Navbar/>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/map" component={Map} exact/>
                <Route path="/add-image" component={AddImage} exact />
                <Route path="/about" component={About} exact />
                <Route  component={ErrorPage}/>
              </Switch>
              <div>
            
              
              <section>
              <Footer />
              </section>
              </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
