const Bcrypt = require("bcryptjs");
const uniqid = require("uniqid");
const router = require("express").Router();
const mongoose = require('mongoose');
const User = require("../models/users.model");
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
//const PrivateChat = require("../models/privateChats.model")
//const Club = require("../models/clubs.model");
//const jwt = require("jsonwebtoken"); // for hashing and sigining the tokens
//const authJs = require("../middleware/auth.js");
const ObjectId = mongoose.Types.ObjectId;
//const authenticateToken = authJs.authenticateToken;
//const deleteToken = authJs.deleteToken;
const cors = require('cors');
const express = require('express');
const app = express()
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000'
};

global.refreshTokens = [];
// const Message = require("../models/messages.model");
// const Chatroom = require("../models/chatrooms.model");
// const Mongoose = require("mongoose");
// const { useRef } = require("react");
app.use(cors(corsOptions));
//const nodemailer = require("nodemailer");
const generatePassword = require('password-generator');
//const privateChatsModel = require("../models/privateChats.model");
/*const emailTransporter = (userEmail, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'buildingblocks507@gmail.com',
      pass: 'Ranndomm123'
    }
  });

  let mailOptions = {
    from: 'buildingblocks507@gmail.com',
    to: `${userEmail}`,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions)
    .then(response => {
      console.log("Success")
    })
    .catch(error => {
      console.log("Error")
    });
};*/

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

/*router.route("/addusers").post(async (req, res) => {
  let isClubCreated = false;
  let club;
  let results = [];
  fs.createReadStream("./batch_files/users.csv")
    .pipe(csv())
    .on("data", (data) => {
      results.push({
        username: data[0],
        email: data[1],
        clubName: data[2],
        userRole: data[3]
      })
    })
    .on("end", () => {
      results.shift();
      results.forEach(async user => {

        if (!isClubCreated) {
          club = await Club.findOne({ clubName: user.clubName });
          if (!club) {
            club = new Club({ clubName: user.clubName });
            await club.save();
          }
          isClubCreated = true;
        }

        const userFound = await User.findOne({ email: user.email });

        if (!userFound) {
          const salt = 10;
          const userName = user.username;
          const userPassword = generatePassword(16, false);
          const hashPassword = await Bcrypt.hash(userPassword, salt);
          const userEmail = user.email;
          const userRole = user.userRole;
          const userClub = [club];
          const text = `Hello your account is now active for BuildingBlocks App. 
          Username:${userName}
          Password: ${userPassword}
          **Please change your password within 24 hours**`
          const subject = 'Change Password Reminder'

          const newUser = new User({
            username: userName,
            password: hashPassword,
            email: userEmail,
            avi: null,
            userRole: userRole,
            bio: null,
            club: userClub,
          });

          newUser.save();
          emailTransporter(userEmail, subject, text);

        } else {
          const userRole = user.userRole;
          const userName = user.username;
          const userEmail = user.email;
          const userClub = user.clubName;
          const subject = 'Change Password Reminder'
          const text = `Hi ${userName} you have been added to ${userClub} club as a ${userRole}`

          userFound.club.push(club);
          userFound.save();
          emailTransporter(userEmail, subject, text)
        }

      });

      results = null;

    });
});
*/
router.route("/add").post(async (req, res) => {
  const salt = 10;
  const username = req.body.username;
  const password = await Bcrypt.hash(req.body.password, salt);
  const email = req.body.email;
  const avi = Number(req.body.avi);

  const newUser = new User({
    username,
    password,
    email,
    avi,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

async function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

router.route("/login").post(async (req, res) => {
  console.log("login");
  const user = await User.findOne({ email: req.body.email });
  if (user === null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    const isMatch = await Bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    /*const payload = { user: { id: user.id } };
    console.log('payload', payload);
    const token = await generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    console.log(token);
    refreshTokens.push(refreshToken);
    res.cookie('refreshtoken', refreshToken, {
      sameSite: 'strict',
      path: '/',
      httpOnly: true
    });*/
    res.json({ user });
  } catch (err) {
    res.status(500).send();
  }
});

router.route("/auth/login").post(async (req, res) => {
  const ticket = await client.verifyIdToken({
    idToken: req.body.tokenId,
    audience: process.env.CLIENT_ID
  }).catch((err) => res.status(500).send());
  if(ticket.statusCode !== 500) {
    const { name, email } = ticket.getPayload()
    const user = await User.findOneAndUpdate({ email: email }, { name: name, email: email}, { upsert: true });
    console.log(user);
    if (user === null) {
      return res.status(400).send("Cannot find or create user");
    }
    res.json({ user });
  }   
  });

module.exports = router;