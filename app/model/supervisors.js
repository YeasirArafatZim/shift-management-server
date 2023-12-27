const mongoose = require("mongoose");

const supervisorsSchema = new mongoose.Schema({
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    unique: [true, "Already assigned to a supervisor"],
  },
  supId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Supervisor = new mongoose.model("Supervisor", supervisorsSchema);

module.exports = Supervisor;
