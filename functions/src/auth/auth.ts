import { auth, firestore } from "../admin/admin";
import * as functions from "firebase-functions";
const axios = require("axios");

/**
 * Receive the {getTokenSilently} from auth0
 */
exports.createCustomToken = async (request: any, response: any) => {
  const { sub: uid } = request.user;

  const profile = await axios({
    method: "get",
    url: `https://${functions.config().auth0.domain}/userinfo`,
    headers: { Authorization: request.headers.authorization },
  })
    .then((data: any) => {
      return data;
    })
    .catch((err: any) => {
      response.status(500).send({
        message: "Something went wrong getting user info.",
        error: err,
      });
    });

  const userOrgs = await firestore.collection("Groups").where("Members","array-contains", profile.data.email).get().then((snap) => {
      let temp: any = [];
      if (snap.empty) return [''];
      snap.forEach((snapshot: any) => temp.push(snapshot.data()?.DisplayName));
      return temp;
    });

  const claims: any = {
    email: profile.data.email,
    auth0_id: profile.data.sub,
    Groups: userOrgs,
  };
  console.log(claims)

  auth
    .createCustomToken(uid, claims)
    .then((customToken) => {
      response.json({ firebaseToken: customToken });
    })
    .catch(function (error) {
      response.status(500).send({
        message: "Something went wrong acquiring a Firebase token.",
        error: error,
      });
    });
};

exports.createTestUser = (request: any, response: any) => {
  auth
    .createUser({
      email: "user@example.com",
      emailVerified: false,
      phoneNumber: "+11234567890",
      password: "secretPassword",
      displayName: "John Doe",
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false,
    })
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      response.json(userRecord.toJSON());
    })
    .catch(function (error) {
      console.log("Error creating new user:", error);
      response.send("Error creating new user");
    });
};
