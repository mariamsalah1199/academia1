const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

// Require Router Handlers
const users = require("./routes/api/users");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

require("./config/passport")(passport);

// Direct to Route Handlers
app.use("/api/users", users);

app.use((req, res) => res.status(404).send(`<h1>Welcome to the HUB</h1>`));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server on ${port}`));
