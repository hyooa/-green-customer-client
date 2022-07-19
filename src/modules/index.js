import { combineReducers } from "redux";
import customers from "./customers";

// 💛 여러개 reducer 합치기
const rootReducer = combineReducers({ customers });

export default rootReducer;