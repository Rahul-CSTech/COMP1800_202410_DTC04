const firebaseConfig = {
    apiKey: "AIzaSyAMdnShAqlZW8e7zFLnenWjIsu1Tjydcug",
    authDomain: "bcit-comp1800-dtc04.firebaseapp.com",
    projectId: "bcit-comp1800-dtc04",
    storageBucket: "bcit-comp1800-dtc04.appspot.com",
    messagingSenderId: "198872342222",
    appId: "1:198872342222:web:88ffd408444bc6b593fa9f"
  };

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
