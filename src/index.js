import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import MainPageComp from './MainPageComp/MainPageComp';
import RegisterComp from './RegisterComp/RegisterComp';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginComp from './LoginComp/Login';

// WAS HERE 7 LINES
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element ={<App></App>}>
        <Route path="home" element ={<MainPageComp></MainPageComp>}></Route>
        <Route path="/login" element ={<LoginComp></LoginComp>}></Route>
        <Route path="/register" element ={<RegisterComp></RegisterComp>}></Route>
        <Route
        path="*"
        element={
        <main style={{ padding: "8rem" }}>
          <p>There's nothing here!</p>
        </main>
        }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
