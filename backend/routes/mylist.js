import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    const [rows] = pool.query(
      "SELECT * FROM mylist WHERE userId = ? AND movieId = ?",
      [userId, movieId]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: "Movie already in list" });
    }

    await pool.query(
      "INSERT INTO mylist (userId, movieId) VALUES (?, ?)",
      [userId, movieId]
    );

    res.status(200).json({ message: "Movie added to list" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = pool.query(
      "SELECT movieId FROM mylist WHERE userId = ?",
      [userId]
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
