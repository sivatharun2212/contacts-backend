const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
	let token;
	let authHeader = req.header("Authorization") || req.header("Auth");
	console.log("autherHeader", authHeader);
	if (authHeader && authHeader.startsWith("Bearer")) {
		token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				res.status(401);
				throw new Error("user is not authorized");
			}
			req.user = decoded.user;
			next();
		});
	} else {
		res.status(400);
		throw new Error("user is not authorized or token is missing");
	}
});

module.exports = validateToken;
