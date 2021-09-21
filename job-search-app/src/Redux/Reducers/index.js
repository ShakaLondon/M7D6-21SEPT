import { combineReducers } from "redux";
import favouritesReducer from "./favouritesReducer";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";


const reducers = combineReducers({
    favourites: favouritesReducer,
    search: searchReducer,
    user: userReducer,
});
console.log(reducers)
export default reducers;