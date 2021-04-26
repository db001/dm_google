import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import PlayerCampaign from "../Players/PlayerCampaign";

class CampaignDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			campaign_name: "",
			players: [],
		};
	}
	componentDidMount() {
		// this.props.fetchSingleCampaign(this.props.match.params.id);
		this.getCampaignName();
	}

	async getCampaignName() {
		await this.props.fetchSingleCampaign(this.props.match.params.id);
		const campaign_name = this.props.singleCampaign
			? this.props.singleCampaign.campaign_name
			: "";
		this.setState({
			campaign_name,
		});
	}

	async fetchPlayers() {
		await this.props.fetchPlayers();
		this.setState({
			players: this.props.players,
		});
	}

	renderPlayers = () => {
		if (this.state.players.length > 0) {
			return (
				<ul>
					{this.props.players.map((player) => (
						<PlayerCampaign
							key={player.character_id}
							data={player}
						/>
					))}
				</ul>
			);
		} else {
			return (
				<div>
					<p>No players currently listed in this campaign</p>
					<button className="btn" onClick={() => this.fetchPlayers()}>
						Add Player
					</button>
				</div>
			);
		}
	};

	render() {
		return (
			<Fragment>
				<p>Campaign name:</p>
				{this.state.campaign_name ? (
					<h2>{this.state.campaign_name}</h2>
				) : (
					<h2>Fetching campaign details</h2>
				)}
				{this.renderPlayers()}
			</Fragment>
		);
	}
}

function mapStateToProps({ singleCampaign, players }) {
	return { singleCampaign, players };
}

export default connect(mapStateToProps, actions)(CampaignDetails);
