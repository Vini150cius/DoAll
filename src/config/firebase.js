import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

  const firebaseConfig = {
  apiKey: "AIzaSyDq2_JdA5vcbpoEc1wwm22Z8lhCSnF9ux8",
  authDomain: "pam-doall.firebaseapp.com",
  databaseURL: "https://pam-doall-default-rtdb.firebaseio.com",
  projectId: "pam-doall",
  storageBucket: "pam-doall.firebasestorage.app",
  messagingSenderId: "4140551182",
  appId: "1:4140551182:web:ba8a7c7b12bf907ac7005f",
  measurementId: "G-N16EVJDD84"
};

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const analytics = getAnalytics(app);

  export { app, analytics, db };