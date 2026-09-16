
const firebaseConfig = {
  apiKey: "AIzaSyDEU8mGIkO0lRaZzdUoaXQMfRL4-yg7CoA",
  authDomain: "p5-diary-ca5f7.firebaseapp.com",
  projectId: "p5-diary-ca5f7",
  storageBucket: "p5-diary-ca5f7.firebasestorage.app",
  messagingSenderId: "290258973302",
  appId: "1:290258973302:web:6a3dd7d988dd75755a6557"
}

//Opret forbindelse til firebase
firebase.initializeApp(firebaseConfig)
console.log('Firebase startet med: ', firebaseConfig.projectId)


//vi får nu et firestore "objekt" som vi kan bruge til at kommunikere med firestore
var db = firebase.firestore()
console.log('forbindelse til firestore oprettet')