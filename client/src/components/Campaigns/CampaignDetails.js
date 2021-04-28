import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";

import PlayerCampaign from "../Players/PlayerCampaign";
import { Link } from "react-router-dom";

class CampaignDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			campaign_name: "",
			campaign_id: "",
			campaignPlayers: [],
			otherPlayers: [],
		};
	}

	componentDidMount() {
		this.getCampaignDetails();
	}

	async getCampaignDetails() {
		await this.props.fetchSingleCampaign(this.props.match.params.id);
		const campaign_name = this.props.singleCampaign ? this.props.singleCampaign.campaign_name : "";

		const campaign_id = this.props.singleCampaign ? this.props.singleCampaign.campaign_id : "";

		this.setState({
			campaign_name,
			campaign_id,
		});
	}

	async fetchCampaignPlayers(id) {
		await this.props.fetchCampaignPlayers(this.props.singleCampaign.campaign_id);
		this.setState({
			campaignPlayers: this.props.campaignPlayers,
		});
	}

	async fetchOtherPlayers() {
		await this.props.fetchPlayers();
		this.setState({
			otherPlayers: this.props.players,
		});
	}

	addToCampaign = async (player_id, campaign_id) => {
		console.log(player_id, campaign_id);
		const data = {
			campaign_id,
		};
		try {
			const response = await axios({
				method: "POST",
				url: `/api/players/campaign/add/${player_id}`,
				headers: {
					"Content-type": "application/json",
				},
				data,
			});

			if (response) {
				this.props.fetchCampaignPlayers(this.props.singleCampaign.campaign_id);
				this.props.fetchPlayers();
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	async removePlayer(player_id, campaign_id) {
		// const data = {
		// 	campaign_id,
		// };
		// try {
		// 	const response = await axios({
		// 		method: "DELETE",
		// 		url: `/api/players/campaign/remove/${player_id}`,
		// 		headers: {
		// 			"Content-type": "application/json",
		// 		},
		// 		data,
		// 	});
		// 	// const response = await axios.delete(
		// 	// 	`/api/players/campaign/remove/${player_id}`
		// 	// );
		// 	console.log(response.data);
		// 	this.props.fetchCampaignPlayers();
		// 	this.props.fetchPlayers();
		// } catch (error) {
		// 	console.log(error);
		// }
	}

	renderPlayers = () => {
		if (this.state.campaignPlayers.length > 0) {
			return (
				<div>
					<p>Players in this campaign</p>
					<ul>
						{this.props.players.map((player) => (
							<PlayerCampaign
								key={player.character_id}
								data={player}
								inCampaign={true}
								campaign_id={this.props.singleCampaign.campaign_id}
								removePlayer={this.removePlayer}
							/>
						))}
					</ul>
				</div>
			);
		} else {
			return (
				<div>
					<p>No players currently listed in this campaign</p>
					<button className="btn" onClick={() => this.fetchOtherPlayers()}>
						Add Player
					</button>
				</div>
			);
		}
	};

	renderOtherPlayers() {
		if (this.state.otherPlayers.length > 0) {
			return (
				<div>
					<p>Your other players</p>
					<ul>
						{this.state.otherPlayers.map((player) => (
							<PlayerCampaign
								key={player.character_id}
								data={player}
								inCampaign={false}
								campaign_id={this.props.singleCampaign.campaign_id}
								addPlayer={this.addToCampaign}
							/>
						))}
					</ul>
				</div>
			);
		} else if (this.state.otherPlayers === false) {
			return (
				<p>
					You don't have any players you can add,&nbsp;
					<Link to="/players/new">click here to add some players</Link>
				</p>
			);
		}
	}

	render() {
		return (
			<Fragment>
				<p>Campaign name:</p>
				{this.state.campaign_name ? <h2>{this.state.campaign_name}</h2> : <h2>Fetching campaign details</h2>}
				{this.renderPlayers()}
				{this.renderOtherPlayers()}
			</Fragment>
		);
	}
}

function mapStateToProps({ singleCampaign, players }) {
	return { singleCampaign, players };
}

export default connect(mapStateToProps, actions)(CampaignDetails);
