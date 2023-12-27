const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Employee = require("../model/employee");
const auth = require("../middleware/auth");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({
      $or: [{ email: email }, { phone: email }],
    });
    const isMatched = await bcrypt.compare(password, employee.password);
    if (employee && isMatched) {
      const token = await employee.generateTokens();
      res.cookie("jwt", token, {
        maxAge: 259200000,
        httpOnly: true,
        // secure: true
      });
      res.send(employee.role);
    } else {
      res.status(400).send("Invalid username or password");
    }
  } catch (e) {
    res.status(400).send("Invalid username or password");
  }
};

const logout = async (req, res) => {
  try {
    req.employee.tokens = req.employee.tokens.filter(
      (tokens) => tokens.token !== req.token
    );
    res.clearCookie("jwt");
    await req.employee.save();
    res.send("Logout Successful");
  } catch (e) {
    res.status(401).send(e);
  }
};

const authenticate = async (req, res) => {
  try {
    res.send(req.employee.role);
  } catch (e) {
    res.status(400).send("Not a Valid User");
  }
};

const adminAuth = async (req, res) => {
  try {
    if (req.employee.role === "Administrator") {
      res.send(req.employee.role);
    } else {
      throw new Error("Not a valid user");
    }
  } catch (e) {
    res.status(401).send("Not a valid user");
  }
};
const supAuth = async (req, res) => {
  try {
    if (req.employee.role === "Supervisor") {
      res.send(req.employee.role);
    } else {
      throw new Error("Not a valid user");
    }
  } catch (e) {
    res.status(401).send("Not a valid user");
  }
};
const empAuth = async (req, res) => {
  try {
    if (req.employee.role === "Employee") {
      res.send(req.employee.role);
    } else {
      throw new Error("Not a valid user");
    }
  } catch (e) {
    res.status(401).send("Not a valid user");
  }
};

const passCheck = async (req, res) => {
  try {
    const { password } = req.body;
    const isMatched = await bcrypt.compare(password, req.employee.password);
    if (isMatched) {
      res.send(isMatched);
    } else {
      throw new Error("Password not matched");
    }
  } catch (e) {
    res.status(400).send("Invalid username or password");
  }
};

router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/auth", auth, authenticate);
router.get("/adminauth", auth, adminAuth);
router.get("/supauth", auth, supAuth);
router.get("/empauth", auth, empAuth);
router.post("/passcheck", auth, passCheck);

module.exports = router;
