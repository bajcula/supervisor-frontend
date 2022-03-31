import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainComp from './MainComp/MainComp';
import MainPageComp from './MainPageComp/MainPageComp';
import LoginComp from './LoginComp/Login';
import RegisterComp from './RegisterComp/RegisterComp';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [serverError, setServerError] = useState("");
  const [userIsValid, setUserIsValid] = useState(true);
  // localStorage.setItem("user", "USER OBJECT FROM BACK END")
  // localStorage.getItem("user") TRUE OR FALSE
  const addNewUser = async (newUser) => {
    const apiResponse = await fetch ("http://localhost:3001/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await apiResponse.json()
    console.log(parsedResponse)
    if (parsedResponse.success) {
        // LOGIN USER and REDIRECT TO /HOME
        localStorage.setItem("user", parsedResponse.data)
        setCurrentUser(parsedResponse.data)
    } else {
        setServerError(parsedResponse.data)
        // REDIRECT TO /
    }
  }
    const tryToLogin = async (possibleUser) => {
      const apiResponse = await fetch ("http://localhost:3001/users/login", {
        method: "POST",
        body: JSON.stringify(possibleUser),
        headers: {
            "Content-Type": "application/json"
        }
      })
      const parsedResponse = await apiResponse.json()
      console.log(parsedResponse)
      if (parsedResponse.success) {
        localStorage.setItem("user", parsedResponse.data)
        setCurrentUser(parsedResponse.data)
        console.log(currentUser)
      } else {
        setServerError(parsedResponse.data)
      }
    }
    
    
  return (
    <Routes>
      <Route path="/" element ={<MainComp currentUser={currentUser}></MainComp>}>
        <Route exact path="home" element ={<MainPageComp></MainPageComp>}></Route>
        <Route exact path="/signin" element ={<LoginComp
        tryToLogin={tryToLogin}
        >
        </LoginComp>}>
        </Route>
        <Route exact path="/signup" element ={<RegisterComp
          addNewUser={addNewUser}
          userIsValid={userIsValid}
          setUserIsValid={setUserIsValid}
          > 
          </RegisterComp>}>  
        </Route>
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
  )
}

export default App