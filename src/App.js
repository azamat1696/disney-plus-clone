import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./components/Detail";
import Login from './components/Login';
import Counter from "./components/Counter";



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>

          <Route path="/login" >
            <Login />
          </Route>
          
          <Route path="/detail/:id">
            <Detail 
            
            />
          </Route>

          <Route path="/">
          <Home />
          </Route>
          <Route path="/counter">
          <Counter />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
