import { GET_CAMPAIGNS, GET_SINGLE_CAMPAIGN } from "../actions/types";

export const campaignReducer = (state = null, action) => {
	switch (action.type) {
		case GET_CAMPAIGNS:
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};

export const singleCampaignReducer = (state = null, action) => {
	switch (action.type) {
		case GET_SINGLE_CAMPAIGN:
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};

function isEmpty(obj) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}
