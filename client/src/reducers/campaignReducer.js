import { GET_CAMPAIGNS } from "../actions/types";

const campaignReducer = (state = null, action) => {
	switch (action.type) {
		case GET_CAMPAIGNS:
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};

export default campaignReducer;

function isEmpty(obj) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}
