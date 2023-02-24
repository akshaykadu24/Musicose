import {legacy_createStore,compose,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import adminReducer from "./adminReducer/admin.reducer";
import { authReducer } from "./authReducer/auth.reducer";
import { productReducer } from "./product/product.reducer";
import cartReducer from "./cart/cart.reducer";

const rootReducer = combineReducers({
    productManager:productReducer,
    adminManager:adminReducer,
    authManager:authReducer
     cart:cartReducer,
    
})

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

export const store = legacy_createStore(rootReducer,composer(applyMiddleware(thunk)))