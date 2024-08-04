// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
      apiKey: "AIzaSyA3TE9fJ5qiehKI_mTPyelixcp9kjqTluQ",
      authDomain: "bangla-bazaar.firebaseapp.com",
      projectId: "bangla-bazaar",
      storageBucket: "bangla-bazaar.appspot.com",
      messagingSenderId: "543327875104",
      appId: "1:543327875104:web:266e06a21bab7ea4230c45",
      measurementId: "G-0KERLY7N0S"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
