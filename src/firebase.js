import firebase from "firebase";
import 'firebase/firestore'


const firebaseApp = firebase.initializeApp({

  apiKey: "AIzaSyA2bpMo9RbHaboKJtJpcw3J51Fkwv6Jna0",
  authDomain: "instagram-clone-reactjs-c3a3d.firebaseapp.com",
  databaseURL: "https://instagram-clone-reactjs-c3a3d.firebaseio.com",
  projectId: "instagram-clone-reactjs-c3a3d",
  storageBucket: "instagram-clone-reactjs-c3a3d.appspot.com",
  messagingSenderId: "1030666073445",
  appId: "1:1030666073445:web:c18bbe63954e40afdddd8c",
  measurementId: "G-VM27C7VPFL"
});


const db = firebaseApp.firestore();
const auth = firebase.auth()

const storage = firebase.storage()



export default firebaseApp.firestore()




export {db,auth,storage};