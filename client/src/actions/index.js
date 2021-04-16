import axios from "axios";
import { FETCH_USER, GET_CAMPAIGNS } from "./types";

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get("/api/current_user");
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
	const res = await axios.post("/api/stripe", token);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCampaigns = () => async (dispatch) => {
	const res = await axios.get("/api/campaigns");
	dispatch({ type: GET_CAMPAIGNS, payload: res.data });
};
