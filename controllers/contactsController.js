const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@description get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find({ user_id: req.user.id });
	res.status(200).json(contacts);
});

//@description get contact
//@route GET /api/contacts/id
//@access private
const getContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}
	res.status(200).json(contact);
});

//@description create contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
	console.log("request body", req.body);
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		res.status(400);
		throw new Error("all fields are mandatory");
	}
	const contact = await Contact.create({
		name,
		email,
		phone,
		user_id: req.user.id,
	});
	res.status(200).json(contact);
});

//@description update contact
//@route PUT /api/contacts/id
//@access private
const updateContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}
	const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(200).json(updatedContact);
});

//@description delete contact
//@route DELETE /api/contacts/id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}
	await Contact.findByIdAndRemove(req.params.id);
	res.status(200).json({ message: `delete contact for ${req.params.id}` });
});

module.exports = {
	getContacts,
	getContact,
	createContact,
	updateContact,
	deleteContact,
};
