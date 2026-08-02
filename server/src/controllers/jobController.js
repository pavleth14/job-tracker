const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const { company, position } = req.body;

    const user = req.user._id;

    const job = await Job.create({
      company,
      position,
      user,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJob = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      })
    }
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "403 Forbidden",
      });
    }
    job.status = status;
    await job.save();
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteJob = async (req, res) => {

  try {

    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      })
    }

    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "403 Forbidden"
      })
    }

    await job.deleteOne();
    res.status(200).json({
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createJob,
  getJob,
  updateJob,
  deleteJob
}