import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { MealContextProvider } from "./components/MealContext";
import MealList from "./components/MealList";
import Home from "./components/Home";
import MealDetail from "./components/MealDetail";
import './index.css'
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
  );
}

export default App;