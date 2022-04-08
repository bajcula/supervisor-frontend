import React, {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MainComp from './MainComp/MainComp';
import MainPageComp from './MainPageComp/MainPageComp';
import LoginComp from './LoginComp/Login';
import RegisterComp from './RegisterComp/RegisterComp';
import EditUserComp from './EditUserComp/EditUserComp';
import DeleteUserComp from './DeleteUserComp/DeleteUserComp';
import PasswordChangeComp from './PasswordChangeComp/PasswordChangeComp';
import apiUrl from './apiConfig';

function App() {
  const resetStatus = () => {
    setTimeout(()=>{
        setServerError("")
    }, 8000)
  }

  const navigate = useNavigate()
  const [serverError, setServerError] = useState("");
  const [userIsValid, setUserIsValid] = useState(true);
  const [quote, setQuote] = useState('');
  const [author, setAuthor]= useState(' ');
  const url = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com',
      'X-RapidAPI-Key': 'a41c64bc73msh742181a2ddce4f2p1a26d7jsnc319cd3ab706'
    }
  };

const fetchQuote = async () => {
  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      if (json.message) {
        setQuote('The morning is wiser than the evening.');
        setAuthor('Serbian proverb')
      } else {
        setQuote(json.text);
        setAuthor(json.author)
      }
    })
    .catch(err => {
      setQuote('The morning is wiser than the evening.');
      setAuthor('Serbian proverb')
      console.log(err)
    });
}


  // localStorage.setItem("user", "USER OBJECT FROM BACK END")
  // localStorage.getItem("user") TRUE OR FALSE
  const addNewUser = async (newUser) => {
    const apiResponse = await fetch (`${apiUrl}/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await apiResponse.json()
    if (parsedResponse.success) {
        localStorage.setItem("user", JSON.stringify(parsedResponse.data))
        setServerError("You have successfully signed up.")
        navigate('/home')
        resetStatus()
    } else {
        setServerError(parsedResponse.data)
        resetStatus()
    }
  }

  const updateUser = async(idToUpdate, userToUpdate) => {
    const apiResponse = await fetch(`${apiUrl}/users/${idToUpdate}`, {
        method: "PUT",
        body: JSON.stringify(userToUpdate),
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(idToUpdate)
    const parsedResponse = await apiResponse.json()
    if (parsedResponse.success) {
      localStorage.setItem('user', JSON.stringify(parsedResponse.data))
      setServerError("Update successfull.")
      resetStatus()
      navigate('/home')
    } else {
      setServerError(parsedResponse.data)
    }
  }
  const deleteUser = async (idToDelete, userToDelete) => {
    try {
      const apiResponse = await fetch(`${apiUrl}/users/${idToDelete}`, {
        method:"DELETE",
        body: JSON.stringify(userToDelete),
        headers: {
            "Content-Type": "application/json"
        }
      })
      const parsedResponse = await apiResponse.json()
      if (parsedResponse.success) {
        setServerError('Successfully deleted. Hope to see you again.')
        localStorage.clear()
        navigate('/home')
      } else {
        setServerError(parsedResponse.data)
        resetStatus()
      }
    } catch (err) {
      setServerError("Front End Error, deletion unsuccessfull.")
    }
  }

  const changePassword = async (idToUpdate, oldPass, newPass) => {
    try {
        console.log(idToUpdate)
        const apiResponse = await fetch(`${apiUrl}/users/${idToUpdate}/updatepassword`, {
        method: "PUT",
        body: JSON.stringify({oldPass, newPass}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await apiResponse.json()
    if (parsedResponse.success) {
      localStorage.setItem("user", JSON.stringify(parsedResponse.data))
      setServerError(`Password successfully updated.`)
      navigate('/edit')
    } else {
      setServerError(parsedResponse.data)
    }
    resetStatus()
    }catch(err){
      setServerError("Browser error, please try again.")
      resetStatus()
    }
  }
// UPDATE PASSWORD FUNCTION 


  const tryToLogin = async (possibleUser) => {
    const apiResponse = await fetch (`${apiUrl}/users/login`, {
      method: "POST",
      body: JSON.stringify(possibleUser),
      headers: {
          "Content-Type": "application/json"
      }
    })
    const parsedResponse = await apiResponse.json()
    console.log(parsedResponse)
    if (parsedResponse.success) {
      localStorage.setItem("user", JSON.stringify(parsedResponse.data))
      setServerError(`Successfully logged in. Welcome!`)
      
    } else {
      setServerError(parsedResponse.data)
    }
    resetStatus()
  }
  const passwordCheck = (str) => {
    const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$");
    return pattern.test(str)
  }


  useEffect(()=>{
    fetchQuote()
    navigate('/home')
  }, [])

  return (
    <Routes>
      <Route path="/" element ={<MainComp serverError={serverError} ></MainComp>}>
        <Route
        exact path="/home"
        element ={
          <MainPageComp
          serverError={serverError}
          setServerError={setServerError}
          quote={quote}
          author={author}
          >
          </MainPageComp>
        }>
        </Route>
        <Route exact path="/signin" element ={<LoginComp
        tryToLogin={tryToLogin}
        >
        </LoginComp>}>
        </Route>
        <Route exact path="/signup" element ={<RegisterComp
          
          passwordCheck={passwordCheck}
          addNewUser={addNewUser}
          userIsValid={userIsValid}
          setUserIsValid={setUserIsValid}
          > 
          </RegisterComp>}>  
        </Route>
        <Route exact path="/edit" element ={<EditUserComp
        resetStatus={resetStatus}
        setServerError={setServerError}
        updateUser={updateUser}
        userIsValid={userIsValid}
        setUserIsValid={setUserIsValid}
        deleteUser={deleteUser}
        >
        </EditUserComp>}>

        </Route>
        <Route exact path="/password" element ={<PasswordChangeComp
        passwordCheck={passwordCheck}
        changePassword={changePassword}
        setServerError={setServerError}
        resetStatus={resetStatus}
        >
        </PasswordChangeComp>}>
        </Route>
        <Route exact path='/delete' element ={<DeleteUserComp
        deleteUser={deleteUser}
        >
        </DeleteUserComp>}> 
        </Route>
        <Route
        path="*"
        element={
        <main style={{ padding: "6rem", fontSize: "2rem" }}>
          <p>There's nothing here!</p>
        </main>
        }
        />
      </Route>
    </Routes>
  )
}

export default App