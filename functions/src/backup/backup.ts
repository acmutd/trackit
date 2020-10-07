import * as functions from "firebase-functions";
import { firestore } from "../admin/admin";

const collection_name = "Workshop_Duplicate";
const sub_collection_name = "Workshop_Logs";

export const backup_on_create = functions.firestore
  .document("Workshop/{Workshop_Name}")
  .onCreate((snap, context) => {
    const document = snap.data();
    const sub_collection_path = collection_name + snap.id + sub_collection_name;
    firestore.collection(collection_name).doc(snap.id).set(document);
    firestore
      .collection(`Workshop_Duplicate/{snap.id}/Workshop_Logs`)
      .doc(snap.id)
      .set({
        created_by: context.auth?.token,
        created_at: FirebaseFirestore.FieldValue.serverTimestamp(),
      });
  });

export const backup_on_update = functions.firestore
  .document("Workshop/{Workshop_Name}")
  .onUpdate((snap, context) => {
    const document = snap.after.data();
    const sub_collection_path =
      collection_name + snap.after.id + sub_collection_name;
    firestore.collection(collection_name).doc(snap.after.id).update(document);
    firestore.collection(`Workshop_Duplicate/{snap.id}/Workshop_Logs`).add({
      update_by: context.auth?.token,
      update_at: FirebaseFirestore.FieldValue.serverTimestamp(),
    });
  });

export const log_on_delete = functions.firestore
  .document("Workshop/{Workshop_Name}")
  .onDelete((snap, context) => {
    const document = snap.data();
    const sub_collection_path = collection_name + snap.id + sub_collection_name;
    firestore.collection(`Workshop_Duplicate/{snap.id}/Workshop_Logs`).add({
        update_by: context.auth?.token,
        update_at: FirebaseFirestore.FieldValue.serverTimestamp(),
      });
  });
