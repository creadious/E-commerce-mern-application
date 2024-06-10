// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRzOOCox3F_r4wwGr0SsXQX6-V1gT2mFE",
  authDomain: "creadious-ecom.firebaseapp.com",
  projectId: "creadious-ecom",
  storageBucket: "creadious-ecom.appspot.com",
  messagingSenderId: "536373749688",
  appId: "1:536373749688:web:1d997e739a848868d3d14d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
