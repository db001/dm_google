const requireLogin = require("../middleware/requireLogin");
const pool = require("../database/db");

module.exports = (app) => {
	app.get("/api/get_data", requireLogin, async (req, res) => {
		try {
			const data = await pool.query(
				"SELECT * FROM campaigns WHERE dm_id = $1",
				["req.user.dm_id"]
			);
			console.log(data.rows[0]);
			res.send(data.rows[0]);
		} catch (error) {
			console.error("Error in get data");
		}
	});

	app.post("/api/campaigns/add", async (req, res) => {
		console.log(req.body);
		try {
			res.send("worked");
			// const newCampaign = await pool.query(
			// 	"INSERT INTO campaigns VALUES"
			// )
		} catch (error) {
			console.error("Error in add campaign");
		}
	});
};
