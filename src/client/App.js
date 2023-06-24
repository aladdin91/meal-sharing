import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { MealContextProvider } from "./components/MealContext";
import MealList from "./components/MealList";
import Home from "./components/Home";
import MealDetail from "./components/MealDetail";
import './index.css'

import { ChakraProvider } from '@chakra-ui/react'


function App() {

  return (
    <ChakraProvider>

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
    </ChakraProvider>

  );
}

export default App;