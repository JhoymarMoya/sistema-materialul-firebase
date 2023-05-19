import { getAnalytics } from "firebase/analytics";
import {  initializeApp}  from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { uuid } from 'uuidv4';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export function firebaseConfig(){
  const config = {
  apiKey: "AIzaSyC7vFtE80uFkQ8CKiEIq2YWtAh3pnGGI1M",
  authDomain: "sistema-11f39.firebaseapp.com",
  projectId: "sistema-11f39",
  storageBucket: "sistema-11f39.appspot.com",
  messagingSenderId: "396311009698",
  appId: "1:396311009698:web:8d1a1c23bfcf1ab274bafb",
  measurementId: "G-YDP1L2RB0G"
  };

  // Initialize Firebase
  const app = initializeApp(config);
  const analytics = getAnalytics(app);
}
export function firebaseRegistrarUsuario(email, password) {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credenciales => {
      // credenciales.user.
    })
}

export async function firebaseIniciarSesion(email, password) {
  try {
    let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
    //credenciales.user();
  } catch (e) {
    return false;
  }
  return true;
}

export async function firebaseBuscar(coleccionABuscar) {//mostrar el listado que tenemos en firebase, la funcion esta en 'customerList'
  let listado = [];
  let consulta = collection(getFirestore(), coleccionABuscar);
  let resultado = await getDocs(consulta);
  resultado.forEach(documento => {
    let objeto = documento.data();//trae un objeto con las información {email:heisy....,phone:12345...,etc}
    objeto.id = documento.id;//trae el id del 'documento' y lo asignamos 
    listado.push(objeto);//agregamos el objeto al listado 
  });
  return listado;
}

export function firebaseCrear(coleccion, objeto) {
  objeto.id = uuid();
  let referencia = doc(getFirestore(), coleccion, objeto.id);
  setDoc(referencia, objeto);
}

export async function firebaseEliminar(coleccion, id) {
  await deleteDoc(doc(getFirestore(), coleccion, id));
}