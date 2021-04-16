import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";

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
			const parseResponse = response;

			console.log("ParseResponse");
			console.log(parseResponse.data);
		} catch (err) {
			console.error(err.message);
		}
	};

	render() {
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
