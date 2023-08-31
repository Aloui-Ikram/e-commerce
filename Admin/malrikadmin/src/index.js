import React from 'react';
import ReactDOM from "react-dom";
import App from './App';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store';
import {BrowserRouter} from "react-router-dom";
import{persistGate} from 'redux-persist/integration/react'

ReactDOM.render(
  
    <BrowserRouter><Provider store={store}>
    <persistGate loading ={null} persistor={persistor}> 
    <App/></persistGate></Provider> </BrowserRouter>
    , document.getElementById("root"));
    