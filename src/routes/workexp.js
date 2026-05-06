const express = require("express");
const router = express.Router();
const db = require("../db");

//Helper function for validating work experience input
function validateWorkExperience(data) {
  const errors = [];

  const requiredFields = [
    "companyname",
    "jobtitle",
    "location",
    "startdate",
    "enddate",
    "description"
  ];

  requiredFields.forEach((field) => {
    if (!data[field] || data[field].toString().trim() === "") {
      errors.push(`${field} is required`);
    }
  });

  return errors;
}

//GET all work experiences
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM workexperiences ORDER BY startdate DESC");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Could not fetch work experiences"
    });
  }
});

//GET one work experience by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM workexperiences WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Work experience not found"
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Could not fetch work experience"
    });
  }
});

//POST new work experience
router.post("/", async (req, res) => {
  const {
    companyname,
    jobtitle,
    location,
    startdate,
    enddate,
    description
  } = req.body;

  const validationErrors = validateWorkExperience(req.body);

  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      messages: validationErrors
    });
  }

  const sql = `
    INSERT INTO workexperiences 
    (companyname, jobtitle, location, startdate, enddate, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.query(sql, [
      companyname.trim(),
      jobtitle.trim(),
      location.trim(),
      startdate,
      enddate,
      description.trim()
    ]);

    res.status(201).json({
      message: "Work experience added",
      id: result.insertId
    });
  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).json({
      error: "Could not add work experience"
    });
  }
});

//PUT update work experience
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const {
    companyname,
    jobtitle,
    location,
    startdate,
    enddate,
    description
  } = req.body;

  const validationErrors = validateWorkExperience(req.body);

  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      messages: validationErrors
    });
  }

  const sql = `
    UPDATE workexperiences
    SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ?, description = ?
    WHERE id = ?
  `;

  try {
    const [result] = await db.query(sql, [
      companyname.trim(),
      jobtitle.trim(),
      location.trim(),
      startdate,
      enddate,
      description.trim(),
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Work experience not found"
      });
    }

    res.json({
      message: "Work experience updated"
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      error: "Could not update work experience"
    });
  }
});

//DELETE work experience
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM workexperiences WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Work experience not found"
      });
    }

    res.json({
      message: "Work experience deleted"
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      error: "Could not delete work experience"
    });
  }
});

module.exports = router;