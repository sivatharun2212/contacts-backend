const mongoose = require("mongoose");

const schema = {
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	name: {
		type: String,
		required: [true, "please add the contact name"],
	},
	email: {
		type: String,
		required: [true, "please add the contact email"],
	},
	phone: {
		type: String,
		required: [true, "please add the contact phone number"],
	},
	tags: {
		type: Array,
	},
};

const contactSchema = mongoose.Schema(schema, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
