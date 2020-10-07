import * as functions from "firebase-functions";
import * as backupFunctions from "./backup/backup";
const authFunctions = require('./auth/auth');
const workshopFunctions = require('./workshops/workshops')

const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");


const app = express();
app.use(cors({ origin: true }));

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${functions.config().auth0.domain}/.well-known/jwks.json`,
  }),
  audience: `https://harshasrikara.com/api`,
  issuer: `https://${functions.config().auth0.domain}/`,
  algorithm: "RS256",
});

app.get("/getCustomToken", jwtCheck, authFunctions.createCustomToken);
app.get("/helloWorld", (req: any, res: any) => {
    res.send("hello world");
})
app.put("/workshop/delete", workshopFunctions.deleteWorkshop);

exports.api = functions.https.onRequest(app);
exports.hello = functions.https.onRequest((req: any, res: any) => {
  res.send("called hello endpoint successfully");
})

export const on_create = backupFunctions.backup_on_create;
export const on_update = backupFunctions.backup_on_update;
export const on_delete = backupFunctions.log_on_delete;