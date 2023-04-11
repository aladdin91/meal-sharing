import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealList from "./components/MealList";

function App() {
  return (
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
