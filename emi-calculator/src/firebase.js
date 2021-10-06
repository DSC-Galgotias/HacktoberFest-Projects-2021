import firebase from 'firebase';
export const intialLizeFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCnZ4khhGo_TnpUEtsJEWybWur4K5ed2M8',
    authDomain: 'emi-calci-2cc8a.firebaseapp.com',
    projectId: 'emi-calci-2cc8a',
    storageBucket: 'emi-calci-2cc8a.appspot.com',
    messagingSenderId: '830933414427',
    appId: '1:830933414427:web:02da15b5135c2f49c8bebe',
    measurementId: 'G-D72VFED9YL'
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};
