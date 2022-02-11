//store.js

import { createStore } from "redux"
import todoApp from "./index"

const store = createStore(todoApp)
export default store