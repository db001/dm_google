import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { campaignReducer, singleCampaignReducer } from "./campaignReducer";
import playersReducers from "./playersReducer";

export default combineReducers({
	auth: authReducer,
	campaigns: campaignReducer,
	singleCampaign: singleCampaignReducer,
	players: playersReducers,
});
