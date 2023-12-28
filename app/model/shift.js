const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    // required: true,
  },
  end: {
    type: Date,
    // required: true,
  },
});
// Overlap logics
shiftSchema.pre("save", async function (next) {
  try {
    const existingShifts = await Shift.find({
      $or: [
        {
          start: { $lt: this.end },
          end: { $gt: this.start },
        },
        {
          start: { $gte: this.start, $lte: this.end },
        },
      ],
    });

    if (existingShifts.length > 0) {
      const errorMessage = "Shift overlaps with existing shift";
      throw new Error(errorMessage);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Shift = new mongoose.model("Shift", shiftSchema);

module.exports = Shift;
