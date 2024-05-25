import admin from 'firebase-admin';
import path from 'path';
import { env } from '../env';

let serviceAccount = path.join(__dirname, env.FIREBASE_API_KEY_LOCATION);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: env.FIREBASE_BUCKET_URL,
});

let bucket = admin.storage().bucket();

export { bucket };
