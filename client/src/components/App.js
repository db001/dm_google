import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import CampaignsList from "./Campaigns/CampaignsList";
import CampaignsNew from "./Campaigns/CampaignsNew";
import PlayersList from "./Players/PlayersList";
import PlayersNew from "./Players/PlayersNew";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container-fluid">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route
							exact
							path="/campaigns"
							component={CampaignsList}
						/>
						<Route
							exact
							path="/campaigns/new"
							component={CampaignsNew}
						/>
						<Route exact path="/players" component={PlayersList} />
						<Route
							exact
							path="/players/new"
							component={PlayersNew}
						/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, actions)(App);
