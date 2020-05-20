export interface user extends firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> {
    isAdmin?: boolean
}