import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainComp from './MainComp/MainComp';
import MainPageComp from './MainPageComp/MainPageComp';
import LoginComp from './LoginComp/Login';
import RegisterComp from './RegisterComp/RegisterComp';
import EditUserComp from './EditUserComp/EditUserComp';

function App() {
  
  const [serverError, setServerError] = useState("");
  const [userIsValid, setUserIsValid] = useState(true);
  const [quote, setQuote] = useState('The morning is wiser than the evening.');
  const [author, setAuthor]= useState('Serbian proverb');
  const [changed, setChanged]= useState(false)
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
      if (json) {
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

    } else {
        setServerError(parsedResponse.data)
        // REDIRECT TO /
    }
  }

  const updateUser = async(idToUpdate, userToUpdate) => {
    const apiResponse = await fetch(`http://localhost:3001/users/${idToUpdate}`, {
        method: "PUT",
        body: JSON.stringify(userToUpdate),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await apiResponse.json()
    if (parsedResponse.success) {
      localStorage.setItem('user', JSON.stringify(parsedResponse.data))
      setServerError("Update successfull.")
    } else {
      setServerError(parsedResponse.data)
    }
  }
  
//   const updateWorker = async (idToUpdate, workerToUpdate) => {
//     const apiResponse = await fetch(`http://localhost:3001/workers/${idToUpdate}`, {
//         method: "PUT",
//         body: JSON.stringify(workerToUpdate),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     const parsedResponse = await apiResponse.json()
//     if (parsedResponse.success) {
//         const newWorkers = workers.map(worker => worker._id === idToUpdate ? workerToUpdate : worker)
//         setWorkers(newWorkers)
//         if(searchedShow) {
//             const newSearchedWorkers = searchedWorkers.map(worker => worker._id === idToUpdate ? workerToUpdate : worker)
//             setSearchedWorkers(newSearchedWorkers)
//         }
//     }else {
//         setServerError(parsedResponse.data)
//     }
// }




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
      localStorage.setItem("user", JSON.stringify(parsedResponse.data))
      
    } else {
      setServerError(parsedResponse.data)
      setTimeout(()=>{
        setServerError("")
      }, 8000)
    }
    setChanged(!changed)
  }
  
  useEffect(()=>{
    fetchQuote()
  }, [])
//changed, serverError make 2nd and 3rd ?? useeffect

  return (
    <Routes>
      <Route path="/" element ={<MainComp serverError={serverError} ></MainComp>}>
        <Route
        exact path="home"
        element ={
          <MainPageComp
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
          addNewUser={addNewUser}
          userIsValid={userIsValid}
          setUserIsValid={setUserIsValid}
          > 
          </RegisterComp>}>  
        </Route>
        <Route exact path="/edit" element ={<EditUserComp
        updateUser={updateUser}
        userIsValid={userIsValid}
        setUserIsValid={setUserIsValid}
        >
        </EditUserComp>}>
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