const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	username: String,
	image: String,
	video: String,
	comment: String,
	likes: Number,
	caption: String,
});

const userSchema = mongoose.model("userSchema", schema);

module.exports = userSchema;
