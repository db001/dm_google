import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

export class Payments extends Component {
	render() {
		return (
			<StripeCheckout
				name="DM Helper"
				description="$5 for me!"
				amount={500}
				token={(token) => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">Pay me</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);
