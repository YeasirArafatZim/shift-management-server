const mongoose = require("mongoose");

const empShiftSchema = new mongoose.Schema({
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

empShiftSchema.pre("save", async function (next) {
  try {
    const assignShifts = await EmpShift.find({
      empId: this.empId,
      date: this.date,
    });

    if (assignShifts.length > 0) {
      throw new Error("Already Assign a shift in this day");
    }
    next();
  } catch (error) {
    next(error);
  }
});

const EmpShift = new mongoose.model("EmpShift", empShiftSchema);

module.exports = EmpShift;
