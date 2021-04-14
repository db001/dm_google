import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

export class Campaigns extends Component {
	componentDidMount() {
		this.props.fetchUserData();
	}

	render() {
		return (
			<div>
				<h1>Campaigns</h1>
			</div>
		);
	}
}

function mapStateToProps({ data }) {
	return { data };
}

export default connect(mapStateToProps, actions)(Campaigns);
