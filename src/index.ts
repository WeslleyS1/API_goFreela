import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import router from "./routes/index";
import { auth } from "express-openid-connect";
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
app.use(cors({ credentials: true }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);
require("./config/config");
require("./config/config")();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

app.use("/", router());

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_OKTA_SECRET,
  baseURL: "http://localhost:3000",
  clientID: process.env.AUTH0_OKTA_CLIENTID,
  issuerBaseURL: "https://gofreeladev2023.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

const { requiresAuth } = require("express-openid-connect");

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
