const requireLogin = require("../middleware/requireLogin");
const pool = require("../database/db");

module.exports = (app) => {
	app.get("/api/get_data", requireLogin, async (req, res) => {
		try {
			const data = await pool.query(
				"SELECT * FROM campaigns WHERE dm_id = $1",
				[req.user.dm_id]
			);
			// console.log(data.rows[0]);
			res.send(data.rows[0]);
		} catch (error) {
			console.error(error);
		}
	});

	app.get("/api/campaigns/", async (req, res) => {
		try {
			const campaigns = await pool.query(
				"SELECT * FROM campaigns WHERE dm_id = $1",
				[req.user.dm_id]
			);

			if (campaigns.rows.length == 0) {
				return res.status(401).json("No campaigns");
			}

			res.send(campaigns.rows);
		} catch (error) {
			console.error("Error in get campaigns");
			console.error(error);
			res.send(error.message);
		}
	});

	app.post("/api/campaigns/add", async (req, res) => {
		try {
			const campaign = await pool.query(
				"SELECT * FROM campaigns WHERE dm_id = $1 AND campaign_name = $2",
				[req.user.dm_id, req.body.name]
			);

			if (campaign.rows.length > 0) {
				return res.status(401).json("Campaign already exists");
			}

			const newCampaign = await pool.query(
				"INSERT INTO campaigns (dm_id, campaign_name) VALUES ($1, $2) RETURNING *",
				[req.user.dm_id, req.body.name]
			);
			console.log(newCampaign.rows[0]);
			res.send(newCampaign.rows[0]);
		} catch (error) {
			console.error("Error in add campaign");
			console.error(error);
			res.send(error.message);
		}
	});
};
