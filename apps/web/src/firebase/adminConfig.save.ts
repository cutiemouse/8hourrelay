import admin from "firebase-admin";

if (admin.apps.length === 0)
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replaceAll("\\n", "\n"),
    }),
  });

const firebaseDb = admin.firestore();

export { firebaseDb };
