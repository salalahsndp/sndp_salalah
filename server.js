require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
mongoose.connect(process.env.DATABASE_URL);
app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "dist")));

//importing routers
const membersRouter = require("./routes/members.js");
app.use("/api/members", membersRouter);
const adminsRouter = require("./routes/admins.js");
app.use("/api/admins", adminsRouter);
const shakhaRouter = require("./routes/shakhas.js");
app.use("/api/shakhas", shakhaRouter);
const loginRouter = require("./routes/login.js");
app.use("/api/login", loginRouter);

// Serving the react build
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//starting the server
app.listen(process.env.port || 5000, () => console.log("Server Started"));
