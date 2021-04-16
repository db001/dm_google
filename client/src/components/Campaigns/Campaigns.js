import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { Link } from "react-router-dom";

import Campaign from "./Campaign";

class Campaigns extends Component {
	componentDidMount() {
		this.props.fetchCampaigns();
	}

	// getCampaigns = async () => {
	// 	try {
	// 		const response = await axios.get("/api/campaigns/");

	// 		this.setState({
	// 			campaigns: response.data,
	// 		});
	// 	} catch (err) {
	// 		console.error(err.message);
	// 	}
	// };

	deleteCampaign = async (id) => {
		try {
			const response = await axios.delete(`/api/campaigns/delete/${id}`);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	renderCampaigns = () => {
		console.log(this.props);
		return <p>argh</p>;
		if (this.props.campaigns.length === 0) {
			return (
				<li key="noCampaigns">
					You haven't created any campaigns, click the link above
				</li>
			);
		}
		const myCampaigns = this.props.campaigns.map((campaign) => {
			return (
				<Campaign
					key={campaign.campaign_id}
					data={campaign}
					deleteCampaign={this.deleteCampaign}
				/>
			);
		});

		return myCampaigns;
	};

	render() {
		return (
			<div className="row">
				<div className="col">
					<h1>Campaigns</h1>
					<Link to="/campaigns/new">Add a campaign</Link>
					<ul>{this.renderCampaigns()}</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ campaigns }) {
	return { campaigns };
}

export default connect(mapStateToProps, actions)(Campaigns);
