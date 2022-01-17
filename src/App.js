import React, { useState, useRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import router from "./router/router";

import TopNav from './component/TopNav/TopNav'
import Home from './views/Home/Home'
import Explore from './views/Explore/Explore';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopNav></TopNav>
        { router }
      </BrowserRouter>
    </div>
  );
}

export default App;
