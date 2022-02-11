import React, { useState, useRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import router from "./router/router";

import TopNav from './component/TopNav/TopNav'
import Player from './component/Player/Player'
import Home from './views/Home/Home'
import Explore from './views/Explore/Explore';

import Footer from './component/Footer'
import AddTodo from './component/AddTodo'
import VisibleTodoList from './component/VisibleTodoList'
import ClearItem from './component/ClearItem'

function App() {

  const [enablePlayer,setEnablePlayerc] = useState(true);
  const playerRef = useRef({});

  return (
    <div className="App">
      <BrowserRouter>
        {/* <AddTodo />
        <VisibleTodoList />
        <Footer />
        <ClearItem />  */}
        <TopNav></TopNav>
        { router }
        { enablePlayer && <Player ref={playerRef} /> }
      </BrowserRouter>
    </div>
  );
}

export default App;
