const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
connectDb();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/contacts", require("./routes/contactsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
