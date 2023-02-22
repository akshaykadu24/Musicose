import {legacy_createStore,compose,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./product/product.reducer";



const rootReducer = combineReducers({
    productManager:productReducer,
})

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

export const store = legacy_createStore(rootReducer,composer(applyMiddleware(thunk)))