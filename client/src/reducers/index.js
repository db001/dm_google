import { combineReducers } from "redux";
import { authReducer, campaignReducer } from "./authReducer";

export default combineReducers({
	auth: authReducer,
	campaigns: campaignReducer,
});
