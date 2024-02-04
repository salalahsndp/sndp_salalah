require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
mongoose.connect(process.env.DATABASE_URL);
app.use(express.json());

//importing routers
const membersRouter = require("./routes/members.js");
app.use("/api/members", membersRouter);
const adminsRouter = require("./routes/admins.js");
app.use("/api/admins", adminsRouter);
const shakhaRouter = require("./routes/shakhas.js");
app.use("/api/shakhas", shakhaRouter);
const loginRouter = require("./routes/login.js");
app.use("/api/login", loginRouter);

//starting the server
app.listen(3000, () => console.log("Server Started"));
