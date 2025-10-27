
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js"; 
import {db} from "config.js"; 




try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}