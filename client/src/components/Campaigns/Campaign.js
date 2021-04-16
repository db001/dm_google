import React from "react";
import { Link } from "react-router-dom";

function Campaign(props) {
	return (
		<li>
			<div className="card">
				<div className="card-content">
					<span className="card-title">
						{props.data.campaign_name}
					</span>
					<p>{props.data.campaign_name}</p>
				</div>
				<div className="card-action">
					<Link to="/campaigns/{props.campaign_id}">
						Go to campaign
					</Link>
					<button
						onClick={() =>
							props.deleteCampaign(props.data.campaign_id)
						}
						className="red-text"
					>
						Delete
					</button>
				</div>
			</div>
		</li>
	);
}

export default Campaign;
