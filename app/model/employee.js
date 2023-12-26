const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: [30, "Exceed maximum length"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
  },
  phone: {
    type: String,
    required: true,
    unique: [true, "Phone number already exists"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Administrator", "Supervisor", "Employee"],
    default: "Employee",
  },
  supervisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Converting password into hash
employeeSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (e) {
    console.log(e);
  }
});

// generating jsonWebToken tokens
employeeSchema.methods.generateTokens = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = [...this.tokens, { token: token }];
    await this.save();
    return token;
  } catch (e) {
    console.log(e);
  }
};

const Employee = new mongoose.model("Employee", employeeSchema);

module.exports = Employee;
