import { combineReducers } from "redux";
import authReducer from "./authReducer";
import campaignReducer from "./campaignReducer";
import playersReducers from "./playersReducer";

export default combineReducers({
	auth: authReducer,
	campaigns: campaignReducer,
	players: playersReducers,
});
