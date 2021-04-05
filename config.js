import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBXgAsujXp3OKHjZ2GJ_Y7MzAjY6Vs07-Q",
    authDomain: "booksanta-c91b3.firebaseapp.com",
    projectId: "booksanta-c91b3",
    storageBucket: "booksanta-c91b3.appspot.com",
    messagingSenderId: "618649838787",
    appId: "1:618649838787:web:ab3f59ffc395f8d85a2e76"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();