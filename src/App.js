import React, { useState, useRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import router from "./router/router";

import { connect } from 'react-redux';

import TopNav from './component/TopNav/TopNav'
import Player from './component/Player/Player'
import Home from './views/Home/Home'
import Explore from './views/Explore/Explore';

import Footer from './component/Footer'
import AddTodo from './component/AddTodo'
import VisibleTodoList from './component/VisibleTodoList'
import ClearItem from './component/ClearItem'

function App(props) {
  const [enablePlayer,setEnablePlayerc] = useState(true);
  const playerRef = useRef({});
  // const InjectStore = connect((state)=>state, ()=>{})((props)=>{
  //   console.log(props.store)
  //   props.player._setStore(props.store); 
  //   console.log(props.player.store)
  //   return null;
  // });

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
