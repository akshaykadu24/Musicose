import {legacy_createStore,compose,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import adminReducer from "./adminReducer/admin.reducer";
import { productReducer } from "./product/product.reducer";

const rootReducer = combineReducers({
    productManager:productReducer,
    adminManager:adminReducer,
    // authManager:authReducer
})

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

export const store = legacy_createStore(rootReducer,composer(applyMiddleware(thunk)))