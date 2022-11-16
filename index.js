import {initializeApp} from 'firebase/app'
import {
  getFirestore,collection,onSnapshot,
  addDoc,deleteDoc,doc,
  query,where,
  orderBy,
  serverTimestamp,getDoc,updateDoc
} from 'firebase/firestore'

import {
  getAuth,
  createUserWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAImWGx44BjUngqNQhWYVPM774A2OZdVtY",
    authDomain: "first-214b0.firebaseapp.com",
    projectId: "first-214b0",
    storageBucket: "first-214b0.appspot.com",
    messagingSenderId: "589692490414",
    appId: "1:589692490414:web:d1a6f8982ff3687a36933f",
    measurementId: "G-BQCC3NFZMR"
  };
  initializeApp(firebaseConfig)

  const db = getFirestore()
  const auth = getAuth();
  const colRef = collection(db,'books');
  const q = query(colRef,where("auther","==","simba"),orderBy('title','desc'))
 

  onSnapshot(colRef,(snapshot)=>{
    let books = []
    snapshot.docs.forEach((doc)=>{
      books.push({...doc.data(),id:doc.id})
    })
    console.log(books)
  })
  // onSnapshot(q,(snapshot)=>{
  //   let books = []
  //   snapshot.docs.forEach((doc)=>{
  //     books.push({...doc.data(),id:doc.id})
  //   })
  //   console.log(books)
  // })


    // adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})
const docRef = doc(db,'books','tCLF1dZw2CgOvZ4ok25O')
// getDoc(docRef)
//  .then((doc)=>{
//   console.log(doc.data(),doc.id)
//  })

 onSnapshot(docRef,(doc)=>{
    console.log(doc.data(),doc.id)
 })


 const updateBookForm = document.querySelector('.update')
updateBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const docRef = doc(db, 'books', updateBookForm.id.value)
  updateDoc(docRef,{
    title:"new title"
  })
  .then(()=>{
    updateBookForm.reset()
  })
})

const email = signupForm.email.value
const password = signupForm.password.value
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()
  createUserWithEmailAndPassword(auth,email,password)
    .then((cred)=>{
      console.log("user created :",cred.user)
      signupForm.reset();
    })
    .catch((err)=>{
      console.log(err.message);
    })
})
