import { combineReducers } from "redux";
import { authReducer, dataReducer } from "./authReducer";

export default combineReducers({
	auth: authReducer,
	data: dataReducer,
});
