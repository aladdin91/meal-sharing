import React from "react";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { MealContextProvider } from "./components/MealContext";
import MealList from "./components/MealList";
import Home from "./components/Home";
import MealDetail from "./components/MealDetail";
import './index.css'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealList from "./components/MealList";


function App() {

  return (
    <MealContextProvider >
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/meals">
          <MealList />
        </Route>
        <Route exact path="/meal/:id">
          <MealDetail />
        </Route>
      </Router>
    </MealContextProvider>
    <Router>
      <Route exact path="/">
        <p>test</p>
      </Route>
      <Route exact path="/meals">
        <MealList />
      </Route>
      <Route exact path="/test-component">
      </Route>
    </Router>
  );
}

export default App;