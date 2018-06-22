import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyA51Mh3I2Rg5MxdiFoffUoq-aTmJysesI8',
  authDomain: 'areaatendimento-d3739.firebaseapp.com',
  databaseURL: 'https://areaatendimento-d3739.firebaseio.com',
  projectId: 'areaatendimento-d3739',
  storageBucket: '',
  messagingSenderId: '903879280896'
}

let fire = firebase.initializeApp(config)
let db = firebase.firestore(fire)

export default fire

export {
  db
}
