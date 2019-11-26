import { createStore } from "redux";
import { Reducers } from "./modules/rootReducer";

export const Store = createStore(Reducers);
