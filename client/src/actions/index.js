import axios from "axios";
import { FETCH_USER, GET_DATA } from "./types";

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get("/api/current_user");
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
	const res = await axios.post("/api/stripe", token);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUserData = () => async (dispatch) => {
	const res = await axios.get("/api/get_data");
	dispatch({ type: GET_DATA, payload: res.data });
};
