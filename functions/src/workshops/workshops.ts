import * as functions from "firebase-functions";
import { firestore } from "../admin/admin";
import { auth } from "../admin/admin";

exports.deleteWorkshop = (request: any, response: any) => {
    auth.verifyIdToken(request.headers.authorization).then((token:any) => {
        let batch = firestore.batch();
        batch.update(firestore.collection("Workshop").doc(request.body.workshop), {op_user: token.email})
        batch.delete(firestore.collection("Workshop").doc(request.body.orkshop));
    }).catch((err:any) => {
        response.status(401).send("Unauthorized")
    })
}
