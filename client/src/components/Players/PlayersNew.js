import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { Redirect } from "react-router";

class PlayersNew extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playerName: "",
		};
	}

	updatePlayerName = (value) => {
		this.setState({
			playerName: value,
			redirect: false,
		});
	};

	onSubmitForm = async (e) => {
		e.preventDefault();
		const data = {
			name: this.state.playerName,
		};
		try {
			const response = await axios({
				method: "POST",
				url: "/api/players/add",
				headers: {
					"Content-type": "application/json",
				},
				data,
			});

			if (response) {
				this.setState({
					redirect: true,
				});
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to="/players" />;
		}
		return (
			<Fragment>
				<div className="row">
					<div className="col">
						<div className="form">
							<h1>Add Player</h1>
							<form onSubmit={this.onSubmitForm}>
								<input
									type="text"
									placeholder="Player Name"
									value={this.state.playerName}
									onChange={(e) =>
										this.updatePlayerName(e.target.value)
									}
								/>
								<button type="submit">Add</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, actions)(PlayersNew);
