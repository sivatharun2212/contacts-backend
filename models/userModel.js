const mongoose = require("mongoose");

const schema = {
	userName: {
		type: String,
		required: [true, "please add the userName"],
	},
	email: {
		type: String,
		required: [true, "please add the userName"],
		unique: [true, "Email in use, please use another email"],
	},
	password: {
		type: String,
		required: [true, "please add password"],
	},
};

const userSchema = mongoose.Schema(schema, { timestamps: true });
module.exports = mongoose.model("User", userSchema);
