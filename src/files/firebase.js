 import firebase from 'firebase';
 
 var firebaseConfig = {
  apiKey: "AIzaSyADaSJHqPLd1cxu4UBzsFtqRATKCxwTK9s",
  authDomain: "ticket-booking-app-7dba6.firebaseapp.com",
  databaseURL: "https://ticket-booking-app-7dba6-default-rtdb.firebaseio.com",
  projectId: "ticket-booking-app-7dba6",
  storageBucket: "ticket-booking-app-7dba6.appspot.com",
  messagingSenderId: "633702574040",
  appId: "1:633702574040:web:6159a26a7e3e9145a8b4ad",
  measurementId: "G-KQSFYKNSRF"
  };
  // Initialize Firebase
   var fire = firebase.initializeApp(firebaseConfig);

   export default fire;