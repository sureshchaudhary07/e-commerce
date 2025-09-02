
import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};
if (!firebaseConfig.apiKey) {
  console.error("Firebase API key is missing!");
}
// Initialize Firebase
let app;
let auth;

// Initialize Firebase (ensure it's initialized only once)
const initializeFirebase = () => {
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      return { app, auth };
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      throw error;
    }
  }
  return { app: getApps()[0], auth: getAuth() };
};

// Get Auth instance
const getFirebaseAuth = () => {
  if (!auth) {
    const { auth: newAuth } = initializeFirebase();
    auth = newAuth;
  }
  return auth;
};

export const logoutUser = async () => {
  try {
    const auth = getFirebaseAuth();
    await signOut(auth);
    localStorage.removeItem("user");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

export const signInWithGoogle = async () => {
  try {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    return {
      success: true,
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      }
    };
  } catch (error) {
    console.error('Google sign-in error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const auth = getFirebaseAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    return {
      success: true,
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName
      }
    };
  } catch (error) {
    console.error('Email login error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const registerWithEmail = async (email, password, username) => {
  try {
    const auth = getFirebaseAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    return {
      success: true,
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: username
      }
    };
  } catch (error) {
    console.error('Email registration error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Export initialization function
export { initializeFirebase };