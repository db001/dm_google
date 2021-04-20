import React from "react";
import { Link } from "react-router-dom";

function Player(props) {
	return (
		<li>
			<div className="card">
				<div className="card-content">
					<span className="card-title">
						{props.data.character_name}
					</span>
					<p>{props.data.player_name}</p>
				</div>
				<div className="card-action">
					<Link to="/player/{props.player_id}">Go to player</Link>
					<button
						onClick={() =>
							props.deleteCampaign(props.data.player_id)
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

export default Player;
