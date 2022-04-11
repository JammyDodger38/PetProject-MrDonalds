import React from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { NavBar } from "./Components/NavBar/NavBar";
import { Menu } from "./Components/Menu/Menu";
import { GlobalStyle } from "./Components/Style/GlobalStyle"
import { ModalItem } from "./Components/Modal/ModalItem"
import { Order } from "./Components/Order/Order"
import { useOpenItem } from './Components/Hooks/useOpenItem'
import { useOrders } from './Components/Hooks/useOrders'
import { useAuth } from './Components/Hooks/useAuth'

const firebaseConfig = {
  apiKey: "AIzaSyCuxzxswWh4UnIAE23k7zgFfhGGk2Dn3ec",
  authDomain: "mrdonalds-b63a2.firebaseapp.com",
  databaseURL: "https://mrdonalds-b63a2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mrdonalds-b63a2",
  storageBucket: "mrdonalds-b63a2.appspot.com",
  messagingSenderId: "1092294936428",
  appId: "1:1092294936428:web:5b03d2d18c86300bc99549"
};

firebase.initializeApp(firebaseConfig);

function App() {
  const auth = useAuth(firebase.auth);
  const openItem = useOpenItem();
  const orders = useOrders();

  return (
    <>
      <GlobalStyle/>
      <NavBar {...auth}/>
      <Order 
        {...orders}
        {...openItem}
        {...auth}
        firebaseDatabase={firebase.database}
      />
      <Menu {...openItem}/>
      { openItem.openItem && <ModalItem {...openItem} {...orders}/>}
    </>
  );
}

export default App;
