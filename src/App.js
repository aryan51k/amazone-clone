import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Orders from './Orders';

const promise = loadStripe('pk_test_51Kp4OHSFfMrfeY2qrTtKEbXmwxqQF8WqvyhlkzWhUvVtMejht30D1PGG2IjoaUxagDRsFUKcCFpPICUM2lharPhP00rprVgGtZ');


function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {

    auth.onAuthStateChanged(authUser => {
      console.log("The user is ---> ", authUser)

      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    //BEM
    <Router>
    <div className="App">
    <Routes>
      <Route path="/checkout" element={[<Header />, <Checkout/>]}/>
      <Route path="/" element={[<Header />, <Home />]}/>
      <Route path='/login' element={[<Login/>]}/>
      <Route path='/payment' element={[<Header/>, <Elements stripe={promise}><Payment/></Elements>]}></Route>
      <Route path='/orders' element={[<Header/>,<Orders/>]}/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
