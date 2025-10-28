import { collection, addDoc,  getDocs, Timestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js"; 
import {db } from "/config.js";
const form = document.querySelector("#form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const todocontainer = document.querySelector(".container");

const alltodo = [];

async function readformdata() {
  const querySnapshot = await getDocs(collection(db, "todos"));
const q = query(collection(db, "todos"), orderBy("time", "desc"));
querySnapshot.forEach((doc) => {
alltodo.push({...doc.data(), docid: doc.id});


});
 console.log(alltodo);
  rendertodo(alltodo);

}


readformdata();







form.addEventListener("submit" , async(event)=>{
  event.preventDefault();
const userData = {
  title : title.value,
  description: description.value,
  time: Timestamp.fromDate(new Date()),
};


try {
  const docRef = await addDoc(collection(db, "todos"), userData);
  console.log("Document written with ID: ", docRef.id);
alltodo.push({...userData, docid: docRef.id});


  rendertodo(alltodo);
} catch (e) {
  console.error("Error adding document: ", e);
}
});











function rendertodo(arr){
todocontainer.innerHTML = "";
arr.map((item)=>{
todocontainer.innerHTML +=  `<div class="todo-card">
      <div class="button-group">
        <button class="edit">✏️ Edit</button>
        <button class="delete">🗑️ Delete</button>
      </div>
      <h2 class="todo-title">Title : ${item.title}</h2>
      <h3 class="todo-desc">Description : ${item.description}</h3>
    </div>
  `

})
 }