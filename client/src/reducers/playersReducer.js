import { GET_PLAYERS, FETCH_CAMPAIGN_PLAYERS } from "../actions/types";

export const playersReducer = (state = null, action) => {
	switch (action.type) {
		case GET_PLAYERS:
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};

export const campaignPlayersReducer = (state = null, action) => {
	switch (action.type) {
		case FETCH_CAMPAIGN_PLAYERS: {
			return isEmpty(action.payload) ? false : action.payload;
		}

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
