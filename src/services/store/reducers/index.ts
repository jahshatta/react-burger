import { combineReducers } from "redux";
import { ordersWsReducer } from "./orders-ws/reducer";

const reducer = combineReducers({
  ordersWs: ordersWsReducer,
});

export default reducer;
