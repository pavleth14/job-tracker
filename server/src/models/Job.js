const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
      company: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: [
          "wishlist",
          "applied",
          "interview",
          "offer",
          "rejected",
          "withdrawn",
        ],
        default: "wishlist",
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;