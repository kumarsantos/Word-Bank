// Import Express JS.
const express = require("express");
const { CheckEmail } = require("../../helpers/validators");
// Import Express Routes
const users = express.Router();

const Users = {
  Praveen: {
    email: "praveen@letsgrad.com",
    fullname: "Praveen Kumar",
    password: "Hello@123"
  },
  AbhiVikrant: {
    email: "abhi@letsgrad.com",
    fullname: "Abhishek Vikrant",
    password: "1234@123"
  },
  Santosh: {
    email: "santosh@letsgrad.com",
    fullname: "Santosh",
    password: "12345"
  },
  Ruchita: {
    email: "ruchita@letsgrad.com",
    fullname: "Ruchita",
    password: "Carol@123"
  },
  Princy: {
    email: "princy@letsgrad.com",
    fullname: "Princy Agarwal",
    password: "passw"
  },
  Nagaraj: {
    email: "nagaraj@letsgrad.com",
    fullname: "Nagaraj",
    password: "nagsvk123"
  },
  angle: {
    email: "angle@letsgrad.com",
    fullname: "Obtuse Angle",
    password: "hello@12"
  }
};

// Adding Routes.
users.get("/", (req, res) => {
  res.status(403).json("You can't see the users! Nananana!");
});
users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (Users[username] && Users[username].password === password) {
      req.session.User = { ...Users[username], username };
      delete req.session.User.password;
      res.json({
        User: req.session.User,
        Error: false,
        Message:
          "Successfully authenticated as " + Users[username].fullname + "."
      });
    } else if (!Users[username]) {
      res.status(404).json({
        Error: true,
        ErrorMessage: "User not found!"
      });
    } else {
      res.status(403).json({
        Error: true,
        ErrorMessage: "Invalid Username or Password!"
      });
    }
  } else {
    res.status(400).json({
      Error: true,
      ErrorMessage: "You should give both username and password!"
    });
  }
});
users.post("/", (req, res) => {
  const { username, password, fullname, email } = req.body;
  const Errors = [];
  if (
    username &&
    password &&
    fullname &&
    email &&
    username.trim().length > 3 &&
    password.trim().length > 3 &&
    fullname.trim().length > 3 &&
    email.trim().length > 3 &&
    CheckEmail(email)
  ) {
    if (Users[username]) {
      res.status(409).json({
        Error: true,
        ErrorMessage: "User already exists."
      });
    } else {
      Users[username] = {
        email,
        fullname,
        password
      };
      res.status(201).json({
        Error: false,
        Message: "User " + username + " created successfully."
      });
    }
  } else {
    if (!username || (username && username.trim().length <= 3)) {
      Errors.push(
        "Username is mandatory and should be more than 3 characters."
      );
    }
    if (!password || (password && password.trim().length <= 3)) {
      Errors.push(
        "Password is mandatory and should be more than 3 characters."
      );
    }
    if (!fullname || (fullname && fullname.trim().length <= 3)) {
      Errors.push(
        "Full Name is mandatory and should be more than 3 characters."
      );
    }
    if (!email || (email && email.trim().length <= 3)) {
      Errors.push("Email is mandatory and should be more than 3 characters.");
    }
    if (!CheckEmail(email && email.trim())) {
      Errors.push("Please enter a valid email address.");
    }
    res.status(400).json({
      Error: true,
      ErrorMessage: Errors
    });
  }
});
module.exports = users;
