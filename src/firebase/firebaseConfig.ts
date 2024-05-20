import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBg4y6UE_IV9A3Ou1_dF7bbyJM-vXYnx-Q",
    authDomain: "poketyping-login.firebaseapp.com",
    projectId: "poketyping-login",
    storageBucket: "poketyping-login.appspot.com",
    messagingSenderId: "337612106413",
    appId: "1:337612106413:web:834fbc0615d256bfa3f424"
});

export const auth = getAuth(firebaseApp);

