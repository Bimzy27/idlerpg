/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app'
import {FirebaseProvider} from "solid-firebase";

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const app = initializeApp({
    apiKey: "AIzaSyCrTOdZzThWIecVNuaqfSlhO5aaAXTRuaU",
    authDomain: "idlerpg-70f9b.firebaseapp.com",
    projectId: "idlerpg-70f9b",
    storageBucket: "idlerpg-70f9b.appspot.com",
    messagingSenderId: "254981840014",
    appId: "1:254981840014:web:6022cd4002381cee0cfddf"
})

render(() => (
    <FirebaseProvider app={app}>
      <App />
    </FirebaseProvider>
), root!);
