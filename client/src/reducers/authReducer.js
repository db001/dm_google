import { FETCH_USER, GET_DATA } from "../actions/types";

export const authReducer = (state = null, action) => {
	switch (action.type) {
		case FETCH_USER:
			// return action.payload || false;
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};

export const dataReducer = (state = null, action) => {
	switch (action.type) {
		case GET_DATA:
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};

// export default authReducer;

function isEmpty(obj) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}