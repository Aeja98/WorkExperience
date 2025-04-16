const express = require("express");
const router = express.Router();
const db = require("../db");

//READ/GET all work experiences
router.get("/", (req, res) => {
    db.query("SELECT * FROM workexperiences", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

//CREATE/POST a new work experience
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

//UPDATE/PUT work experience
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { companyname, jobtitle, location, startdate, enddate } = req.body;

    //Validate input
    if (!companyname || !jobtitle || !location || !startdate) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `UPDATE workexperiences SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ? WHERE id = ?`;

    db.query(sql, [companyname, jobtitle, location, startdate, enddate || null, id], (err, result) => {
        if (err) {
            console.error("Update error:", err);
            return res.status(500).json({ error: "Database update error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Work experience not found" });
        }

        res.json({ message: "Work experience updated" });
    });
});

//DELETE work experience
router.delete("/:id", (req, res) => {
    const { id } = req.params;
  
    const sql = `DELETE FROM workexperiences WHERE id = ?`;
  
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Delete error:", err);
            return res.status(500).json({ error: "Database delete error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Work experience not found" });
        }

        res.json({ message: "Work experience deleted" });
    });
});

module.exports = router;