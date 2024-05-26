import admin from 'firebase-admin';
import path from 'path';
import { env } from '../env';

admin.initializeApp({
  credential: admin.credential.cert(env.FIREBASE_API_KEY_LOCATION),
  storageBucket: env.FIREBASE_BUCKET_URL,
});

let bucket = admin.storage().bucket();

export { bucket };
