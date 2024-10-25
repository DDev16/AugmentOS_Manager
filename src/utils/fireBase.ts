// firebase.ts
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// Optional: If you don't have environment variables, you can directly use the values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase if it's not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { auth };
