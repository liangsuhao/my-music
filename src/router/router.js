import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from '../views/Home/Home';
import Explore from "../views/Explore/Explore";
import Library from "../views/Library/Library";

export default (
  <Routes>
    <Route index element={<Home />} />
    <Route path="/home" element={<Home />}/>
    <Route path="/explore" element={< Explore/>}/>
    <Route path="/library" element={< Library/>}/>
  </Routes>
)