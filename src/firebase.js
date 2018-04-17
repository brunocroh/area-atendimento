import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/datastore';

const config = {
    apiKey: "AIzaSyA51Mh3I2Rg5MxdiFoffUoq-aTmJysesI8",
    authDomain: "areaatendimento-d3739.firebaseapp.com",
    databaseURL: "https://areaatendimento-d3739.firebaseio.com",
    projectId: "areaatendimento-d3739",
    storageBucket: "",
    messagingSenderId: "903879280896"
};
export default firebase.initializeApp(config);
