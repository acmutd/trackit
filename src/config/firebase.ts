import * as firebase from "firebase";
import { FirebaseConfig } from "./interface";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const master_dev_firebaseConfig: FirebaseConfig = {
  apiKey: process.env.REACT_APP_MASTER_DEV_API_KEY,
  authDomain: process.env.REACT_APP_MASTER_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_MASTER_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_MASTER_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_MASTER_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MASTER_DEV_MESSENGER_SENDER_ID,
  appId: process.env.REACT_APP_MASTER_DEV_APP_ID,
  measurementId: process.env.REACT_APP_MASTER_DEV_MEASUREMENT_ID,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const master_prod_firebaseConfig: FirebaseConfig = {
  apiKey: process.env.REACT_APP_MASTER_PROD_API_KEY,
  authDomain: process.env.REACT_APP_MASTER_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_MASTER_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_MASTER_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_MASTER_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MASTER_PROD_MESSENGER_SENDER_ID,
  appId: process.env.REACT_APP_MASTER_PROD_APP_ID,
  measurementId: process.env.REACT_APP_MASTER_PROD_MEASUREMENT_ID,
};

const beta_dev_firebaseConfig = {
  apiKey: process.env.REACT_APP_BETA_DEV_API_KEY,
  authDomain: process.env.REACT_APP_BETA_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_BETA_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_BETA_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BETA_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_BETA_DEV_MESSENGER_SENDER_ID,
  appId: process.env.REACT_APP_BETA_DEV_APP_ID,
  measurementId: process.env.REACT_APP_BETA_DEV_MEASUREMENT_ID,
};

const beta_prod_firebaseConfig = {
  apiKey: process.env.REACT_APP_BETA_PROD_API_KEY,
  authDomain: process.env.REACT_APP_BETA_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_BETA_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_BETA_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BETA_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_BETA_PROD_MESSENGER_SENDER_ID,
  appId: process.env.REACT_APP_BETA_PROD_APP_ID,
  measurementId: process.env.REACT_APP_BETA_PROD_MEASUREMENT_ID,
};

let firebaseConfig: FirebaseConfig;

if (process.env.NODE_ENV !== "production") {
  //locally change from beta_dev_firebaseConfig to access resources with a different api key
  firebaseConfig = beta_dev_firebaseConfig;
} else {
  firebaseConfig = beta_prod_firebaseConfig;
}

const app = firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage().ref();
export default app;
