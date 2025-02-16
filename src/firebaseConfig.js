import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBIIiQBF788ZnsW9gfEnm2XsZQdUaTLBo",
  authDomain: "resumepro-client.firebaseapp.com",
  projectId: "resumepro-client",
  storageBucket: "resumepro-client.appspot.com",
  messagingSenderId: "938924009291",
  appId: "1:938924009291:web:9efdb4ae22743ec13d2ace",
  measurementId: "G-9XF9WN80V7"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
