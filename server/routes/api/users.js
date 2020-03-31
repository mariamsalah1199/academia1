const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const validator = require("../../validations/userValidations");
const tokenKey = require("../../config/keys").secretOrKey;
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.get("/", async (req, res) => {
  const Users = await User.find();
  res.json({ data: Users });
});

router.post("/register", async (req, res) => {
  try {
    const isValidated = validator.registerValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ email: "Email already exists" });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    };
    await User.create(newUser);
    const token = jwt.sign(payload, tokenKey, { expiresIn: "1h" });
    res.json({
      msg: "User created successfully",
      token: `Bearer ${token}`,
      id: newUser.id
    });
  } catch (error) {
    res.status(422).send({ error: "Can not create user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ email: "Email does not exist" });
    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      const payload = {
        id: user.id,
        usename: user.username,
        email: user.email
      };
      const token = jwt.sign(payload, tokenKey, { expiresIn: "1h" });
      return res.json({
        token: `Bearer ${token}`,
        id: user.id
      });
    } else return res.status(400).send({ password: "Wrong password" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
