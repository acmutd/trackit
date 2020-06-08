import * as firebase from "firebase";
import { FirebaseConfig } from "./interface";

const dev_firebaseConfig: FirebaseConfig = {
  apiKey: process.env.DEV_API_KEY,
  authDomain: process.env.DEV_AUTH_DOMAIN,
  databaseURL: process.env.DEV_DATABASAE_URL,
  projectId: process.env.DEV_PROJECT_ID,
  storageBucket: process.env.DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.DEV_MESSENGER_SENDER_ID,
  appId: process.env.DEV_APP_ID,
  measurementId: process.env.DEV_MEASUREMENT_ID,
};

const prod_firebaseConfig: FirebaseConfig = {
  apiKey: process.env.PROD_API_KEY,
  authDomain: process.env.PROD_AUTH_DOMAIN,
  databaseURL: process.env.PROD_DATABASAE_URL,
  projectId: process.env.PROD_PROJECT_ID,
  storageBucket: process.env.PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.PROD_MESSENGER_SENDER_ID,
  appId: process.env.PROD_APP_ID,
  measurementId: process.env.PROD_MEASUREMENT_ID,
};

let firebaseConfig: FirebaseConfig;

if(process.env.NODE_ENV !==  "production") {
  firebaseConfig = dev_firebaseConfig;
}
else {
  firebaseConfig = prod_firebaseConfig;
}

let app = firebase.initializeApp(firebaseConfig);

export default app;
