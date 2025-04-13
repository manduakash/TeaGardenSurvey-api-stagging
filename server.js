import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";

// routes
import logRoutes from "./routes/logs.js";
import loginRoute from "./routes/login.js";
import logoutRoute from "./routes/logout.js";
import  userRoute from "./routes/userRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";
import commonRoutes from "./routes/commonRoutes.js";
import getDistrictsByState from "./routes/dropdownRoutes.js";
const app = express();
// env variables
const host = process.env.API_HOST || 3003;
const port = process.env.API_PORT || 3003;

// for api input in body (json)
app.use(express.json({ limit: "25mb" }));
// for api input in form-date
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// for whitelisting
app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);

// morgan for scrutiny on api requests
const morganFormat = process.env.NODE_ENV === "development"? "dev" : "common";
app.use(morgan(morganFormat));

// Routes
app.use("/api/", logRoutes);
app.use("/api/auth", loginRoute);
app.use("/api/auth", logoutRoute);
app.use("/api/user", userRoute);
app.use("/api", commonRoutes);
app.use("/api",surveyRoutes);
app.use("/api/dropdownList", getDistrictsByState)
// test route
app.use("/test", (req, res) => {
  res.send("api running...");
});


// starting server log
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API log is available at ${host}/api/logs?file=debug.log`);
  console.log(`API log is available at ${host}/api/logs?file=error.log`);
});
