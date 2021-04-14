import React, { Component, Fragment } from "react";
import axios from "axios";

export class CampaignsNew extends Component {
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
		try {
			const response = await axios({
				method: "POST",
				url: "/api/campaigns/add",
				body: {
					name: this.state.name,
				},
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

export default CampaignsNew;
