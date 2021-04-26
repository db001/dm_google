import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Player from "../Players/Player";

class CampaignDetails extends Component {
	componentDidMount() {
		this.props.fetchSingleCampaign(this.props.match.params.id);
	}

	// renderPlayers = () => {
	// 	if (this.props.players.length > 0) {
	// 		return (
	// 			<ul>
	// 				{/* {this.props.players.map((player) => (
	// 					<li>player</li>
	// 				))} */}
	// 			</ul>
	// 		);
	// 	}
	// };

	render() {
		return (
			<Fragment>
				<p>Campaign name:</p>
				<h2>{this.props.singleCampaign.campaign_name}</h2>
			</Fragment>
		);
	}
}

function mapStateToProps({ singleCampaign, players }) {
	return { singleCampaign, players };
}

export default connect(mapStateToProps, actions)(CampaignDetails);
