import admin from "firebase-admin";
import serviceAccount from "../path/to/firebase-key.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
