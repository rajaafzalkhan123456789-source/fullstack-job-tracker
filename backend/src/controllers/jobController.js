const pool = require("../db");

// Get all jobs for logged-in user
exports.getJobs = async (req, res) => {
  try {
    const jobs = await pool.query(
      "SELECT * FROM jobs WHERE user_id = $1",
      [req.user]
    );
    res.json(jobs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { company, role, status, applied_date } = req.body;

    const newJob = await pool.query(
      "INSERT INTO jobs (user_id, company, role, status, applied_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user, company, role, status, applied_date]
    );

    res.json(newJob.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
