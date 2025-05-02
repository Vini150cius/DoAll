import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

  const firebaseConfig = {
    apiKey: "AIzaSyBL9KoyoV-J0nKCH7gM9QICxAExFlh9OWM",
    authDomain: "doall-83ded.firebaseapp.com",
    projectId: "doall-83ded",
    storageBucket: "doall-83ded.firebasestorage.app",
    messagingSenderId: "910120304549",
    appId: "1:910120304549:web:7245488810c96846af324c",
    measurementId: "G-B388X7XZ68"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const analytics = getAnalytics(app);

  export { app, analytics, db };