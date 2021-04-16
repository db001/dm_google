import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { Redirect } from "react-router";

class CampaignsNew extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
		};
	}

	updateName = (value) => {
		this.setState({
			name: value,
			redirect: false,
		});
	};

	onSubmitForm = async (e) => {
		e.preventDefault();
		const data = {
			name: this.state.name,
		};
		try {
			const response = await axios({
				method: "POST",
				url: "/api/campaigns/add",
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
			return <Redirect to="/campaigns" />;
		}
		return (
			<Fragment>
				<div className="form">
					<h1>Add Campaign</h1>
					<form onSubmit={this.onSubmitForm}>
						<input
							type="text"
							placeholder="Campaign Name"
							value={this.state.name}
							onChange={(e) => this.updateName(e.target.value)}
						/>
						<button type="submit">Add</button>
					</form>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, actions)(CampaignsNew);
