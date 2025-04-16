const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all work experiences
router.get("/", (req, res) => {
    db.query("SELECT * FROM workexperiences", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// POST a new work experience
router.post("/", (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate } = req.body;

    // Validate input
    if (!companyname || !jobtitle || !location || !startdate) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    //(?, ?, ?, ?, ?) = placeholders
    const sql = `INSERT INTO workexperiences (companyname, jobtitle, location, startdate, enddate)
        VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [companyname, jobtitle, location, startdate, enddate || null], (err, result) => {
        if (err) {
            console.error("Insert error:", err);
            return res.status(500).json({ error: "Database insert error" });
        }

        res.status(201).json({ message: "Work experience added", id: result.insertId });
    });
});

module.exports = router;