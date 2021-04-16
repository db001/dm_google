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
				"SELECT * FROM player_characters WHERE dm_id = $1 AND character_id = $2",
				[req.user.dm_id, req.body.character_id]
			);

			if (player.rows.length > 0) {
				return res.status(401).json("Player already exists");
			}

			const newPlayer = await pool.query(
				"INSERT INTO player_characters (dm_id, character_name) VALUES ($1, $2) RETURNING *",
				[req.user.dm_id, req.body.name]
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
				[req.user.dm_id, req.params.character_id]
			);

			if (player.rows.length === 0) {
				return res.status(401).send("This player is not yours");
			}

			const deletedPlayer = await pool.query(
				"DELETE FROM player_characters WHERE dm_id = $1 AND character_id = $2 RETURNING *",
				[req.user.dm_id, req.params.character_id]
			);

			res.json(deletedPlayer.rows[0]);
		} catch (err) {
			console.error(err.message);
			res.send(err.message);
		}
	});
};
