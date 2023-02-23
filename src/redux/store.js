import {legacy_createStore,compose,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./product/product.reducer";
import { reducer as adminReducer } from "./adminReducer/reducer";
import { reducer as authReducer } from "./authReducer/reducer";

const rootReducer = combineReducers({
    productManager:productReducer,
    adminManager:adminReducer,
    authManager:authReducer
})

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

export const store = legacy_createStore(rootReducer,composer(applyMiddleware(thunk)))