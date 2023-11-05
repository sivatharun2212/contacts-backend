const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@description register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
	const { userName, email, password } = req.body;
	if (!userName || !email || !password) {
		res.status(400);
		throw new Error("all fields are mandatory!");
	}

	const userAvailable = await User.findOne({ email });
	if (userAvailable) {
		res.status(400);
		throw new Error("user already register!");
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	console.log("hashed password", hashedPassword);
	const user = await User.create({
		userName,
		email,
		password: hashedPassword,
	});
	console.log(`user created ${user}`);
	if (user) {
		res.status(201).json({ _id: user.id, email: user.email });
	} else {
		res.status(400);
		throw new Error("user data is not valid");
	}
	res.status(200).json({ message: "user registered" });
});

//@description login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password, rememberMe } = req.body;
	const expireSession = rememberMe ? "7d" : "24h";
	if (!email || !password) {
		res.status(400);
		throw new Error("all fields are mandatory!");
	}
	const user = await User.findOne({ email });
	if (user && (await bcrypt.compare(password, user.password))) {
		const accessToken = jwt.sign(
			{
				user: {
					userName: user.userName,
					email: user.email,
					id: user.id,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: expireSession }
		);
		res.status(200).json({ accessToken });
	} else {
		res.status(401);
		throw new Error("email and password not valid");
	}
});

//@description user info
//@route GET /api/user/current
//@access private
const currentUser = asyncHandler((req, res) => {
	res.status(200).json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };
