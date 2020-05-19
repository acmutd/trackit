"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("firebase");
const firebaseConfig = {
    apiKey: "AIzaSyC10N5kRDieKncmUESxswqkYQ_359f9Qes",
    authDomain: "trackit-271619.firebaseapp.com",
    databaseURL: "https://trackit-271619.firebaseio.com",
    projectId: "trackit-271619",
    storageBucket: "trackit-271619.appspot.com",
    messagingSenderId: "972365141905",
    appId: "1:972365141905:web:fbda064275f635298cec30",
    measurementId: "G-HRLPFBGB1E",
};
let app = firebase_1.default.initializeApp(firebaseConfig);
exports.default = app;
//# sourceMappingURL=firebase.js.map