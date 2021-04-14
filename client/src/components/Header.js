import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return [
					<li key="head2">
						<a href="/api/logout">Logout</a>
					</li>,
				];
		}
	}

	render() {
		const userName = this.props.auth ? this.props.auth.user.user_name : "";

		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? "/dashboard" : "/"}
						href="/"
						className="left brand-logo"
					>
						{this.props.auth
							? `${userName}'s DM Helper`
							: `DM Helper`}
					</Link>
					<ul id="nav-mobile" className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
