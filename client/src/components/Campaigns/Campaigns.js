import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { Link } from "react-router-dom";

class Campaigns extends Component {
	componentDidMount() {
		this.getCampaigns();
	}

	getCampaigns = async () => {
		try {
			const response = await axios.get("/api/campaigns/");
			const parseResponse = response;

			console.log("ParseResponse");
			console.log(parseResponse.data);
		} catch (err) {
			console.error(err.message);
		}
	};

	render() {
		return (
			<div>
				<h1>Campaigns</h1>
				<Link to="/campaigns/new">Add a campaign</Link>
			</div>
		);
	}
}

function mapStateToProps({ data }) {
	return { data };
}

export default connect(mapStateToProps, actions)(Campaigns);
