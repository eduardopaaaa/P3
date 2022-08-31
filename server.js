//___________________
//Dependencies
//___________________
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
const cors = require("cors");
const userSchema = require("./models/userSchema.js");

app.use(express.json());
app.use(cors());
require("dotenv").config();

// const passwordDb = require("./models/passwordDb.js"); // import data to server
// const schema = require("./models/passwordSchema.js"); // import Schema to server
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

//___________________
//Middleware
//___________________

//use public folder for static assets

app.get("/", (req, res) => {
	userSchema.find({}, (err, findCard) => {
		res.json(findCard);
	});
});

app.post("/create", (req, res) => {
	userSchema.create(req.body, (err, createdCard) => {
		res.json(createdCard);
	});
});

app.put("/update/:id", (req, res) => {
	userSchema.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, updateCard) => {
			res.json(updateCard);
		}
	);
});

app.delete("/delete/:id", (req, res) => {
	userSchema.findByIdAndRemove(req.params.id, (err, deleteCard) => {
		res.json(deleteCard);
	});
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));

//TO RUN LOCAL, UNCOMMENT BELLOW

// mongoose.connect('mongodb://localhost:27017/D2')
// mongoose.connection.once('open', () => {
//     console.log('connected to mongodb...');
// })
// app.listen(3000, () => {
//   console.log('listening...');
// })
