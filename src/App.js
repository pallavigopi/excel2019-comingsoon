import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';


import asyncComponent from './utils/asyncComponent'

const HomeImport  = () => import('./pages/home')
const Home = asyncComponent(HomeImport);

class App extends Component {
  render() {
    return (
      <Home />
    );
  }
}

export default App;
