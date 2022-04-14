import React from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { NavBar } from "./Components/NavBar/NavBar";
import { Menu } from "./Components/Menu/Menu";
import { GlobalStyle } from "./Components/Style/GlobalStyle";
import { ModalItem } from "./Components/Modal/ModalItem";
import { Order } from "./Components/Order/Order";
import { useOpenItem } from './Components/Hooks/useOpenItem';
import { useOrders } from './Components/Hooks/useOrders';
import { useAuth } from './Components/Hooks/useAuth';
import { useTitle } from './Components/Hooks/useTitle';
import { OrderConfirm } from './Components/Order/OrderConfirm';
import { useOrderConfirm } from './Components/Hooks/useOrderConfirm';
import { Context } from './Components/Functions/context';

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
  const orderConfirm = useOrderConfirm();
  useTitle(openItem.openItem);

  return (
    <Context.Provider value={{
      auth,
      openItem
    }}>
      <GlobalStyle/>
      <NavBar/>
      <Order 
        {...orders}
        {...openItem}
        {...auth}
        {...orderConfirm}
      />
      <Menu/>
      { openItem.openItem && <ModalItem {...openItem} {...orders}/>}
      {orderConfirm.openOrderConfirm && 
        <OrderConfirm {...orders} {...auth} {...orderConfirm}
        firebaseDatabase={firebase.database}/>}
    </Context.Provider>
  );
}

export default App;
