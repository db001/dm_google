import { GET_PLAYERS } from "../actions/types";

const playersReducer = (state = null, action) => {
	switch (action.type) {
		case GET_PLAYERS:
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};

export default playersReducer;

function isEmpty(obj) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}
