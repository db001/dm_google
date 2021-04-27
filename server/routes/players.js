const requireLogin = require("../middleware/requireLogin");
const pool = require("../database/db");

module.exports = (app) => {
	app.get("/api/players/", requireLogin, async (req, res) => {
		try {
			const players = await pool.query(
				"SELECT * FROM player_characters WHERE dm_id = $1",
				[req.user.dm_id]
			);

			if (players.rows.length == 0) {
				return res.send(null);
			}

			res.send(players.rows);
		} catch (error) {
			console.error("Error in get players");
			console.error(error);
			res.send(error.message);
		}
	});

	app.post("/api/players/add", requireLogin, async (req, res) => {
		try {
			const player = await pool.query(
				"SELECT * FROM player_characters WHERE dm_id = $1 AND character_name = $2",
				[req.user.dm_id, req.body.name]
			);

			if (player.rows.length > 0) {
				return res.status(401).json("Player already exists");
			}

			const newPlayer = await pool.query(
				"INSERT INTO player_characters (dm_id, character_name, player_initiative, player_dex, player_armour_class, player_hit_points) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
				[
					req.user.dm_id,
					req.body.name,
					req.body.initiative,
					req.body.dex,
					req.body.armourClass,
					req.body.hitPoints,
				]
			);

			res.send(newPlayer.rows[0]);
		} catch (error) {
			console.error("Error in add campaign");
			console.error(error);
			res.send(error.message);
		}
	});

	app.delete("/api/players/delete/:id", requireLogin, async (req, res) => {
		try {
			const player = await pool.query(
				"SELECT FROM player_characters WHERE dm_id = $1 AND character_id = $2",
				[req.user.dm_id, req.params.id]
			);

			if (player.rows.length === 0) {
				return res.status(401).send("This player is not yours");
			}

			const deletedPlayer = await pool.query(
				"DELETE FROM player_characters WHERE dm_id = $1 AND character_id = $2 RETURNING *",
				[req.user.dm_id, req.params.id]
			);

			res.json(deletedPlayer.rows[0]);
		} catch (err) {
			console.error(err.message);
			res.send(err.message);
		}
	});

	app.get("/api/players/campaign/:id", requireLogin, async (req, res) => {
		try {
			const players = await pool.query(
				"SELECT * FROM campaign_players WHERE dm_id = $1 AND campaign_id = $2 RETURNING *",
				[req.user.dm_id, req.params.id]
			);

			res.json(players.rows);
		} catch (error) {
			console.error(err.message);
			res.send(err.message);
		}
	});

	app.post(
		"/api/players/campaign/add/:id",
		requireLogin,
		async (req, res) => {
			try {
				const addPlayer = await pool.query(
					"INSERT INTO campaign_players (campaign_id, character_id) VALUES ($1, $2) RETURNING *",
					[req.body.campaign_id, req.params.id]
				);

				res.send(addPlayer.rows[0]);
			} catch (error) {
				console.error(error.message);
				res.send(error.message);
			}
		}
	);

	app.delete(
		"/api/players/campaign/remove/:id",
		requireLogin,
		async (req, res) => {
			try {
				const player = await pool.query(
					"SELECT FROM campaign_players WHERE dm_id = $1 AND campaign_id = $2 AND character_id = $3",
					[req.user.dm_id, req.body.campaign_id, req.params.id]
				);

				if (player.rows.length === 0) {
					return res.status(401).send("This player is not yours");
				}

				const deletedPlayer = await pool.query(
					"DELETE FROM player_characters WHERE dm_id = $1 AND character_id = $2 RETURNING *",
					[req.user.dm_id, req.params.id]
				);

				res.json(deletedPlayer.rows[0]);
			} catch (err) {
				console.error(err.message);
				res.send(err.message);
			}
		}
	);
};
