import React, {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MainComp from './MainComp/MainComp';
import MainPageComp from './MainPageComp/MainPageComp';
import LoginComp from './LoginComp/Login';
import RegisterComp from './RegisterComp/RegisterComp';
import EditUserComp from './EditUserComp/EditUserComp';
import DeleteUserComp from './DeleteUserComp/DeleteUserComp';

function App() {
  const navigate = useNavigate()
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
        localStorage.setItem("user", JSON.stringify(parsedResponse.data))
        setServerError("You have successfully signed up.")
        setTimeout(()=>{
          setServerError("")
        }, 8000)
    } else {
        setServerError(parsedResponse.data)
        setTimeout(()=>{
          setServerError("")
        }, 8000)
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
  const deleteUser = async (idToDelete, userToDelete) => {
    try {
      const apiResponse = await fetch(`http://localhost:3001/users/${idToDelete}`, {
        method:"DELETE",
        body: JSON.stringify(userToDelete),
        headers: {
            "Content-Type": "application/json"
        }
      })
      const parsedResponse = await apiResponse.json()
      if (parsedResponse.success) {
        setServerError('Successfully deleted. Hope to see you again.')
        navigate('/home')
      } else {
        setServerError(parsedResponse.data)
      }
    } catch (err) {
      setServerError("Front End Error, deletion unsuccessfull.")
    }
  }

//   const deleteWorker = async (idToDelete, workerToDelete) => {
//     try {
//         const apiResponse = await fetch(`http://localhost:3001/workers/${idToDelete}`, {
//             method:"DELETE",
//             body: JSON.stringify(workerToDelete),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         const parsedResponse = await apiResponse.json()
//         console.log(parsedResponse)
//         if (parsedResponse.success) {
//             const newWorkers = workers.filter(worker=>worker._id!==idToDelete)
//             setWorkers(newWorkers)
//         }else{
//             setServerError(parsedResponse.data)
//         }
//     }catch(err){
//         alert("front end error")
//     }
// }



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
    }
    setChanged(!changed)
    setTimeout(()=>{
      setServerError("")
    }, 8000)
  }
  
  // const reset = () => {
  //   setTimeout(()=>{
  //     setServerError("")
  //   }, 8000)
  // }
  // RESET FUNCTION


  useEffect(()=>{
    fetchQuote()
  }, [changed])

  return (
    <Routes>
      <Route path="/" element ={<MainComp serverError={serverError} ></MainComp>}>
        <Route
        exact path="/home"
        element ={
          <MainPageComp
          changed={changed}
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
        setServerError={setServerError}
        updateUser={updateUser}
        userIsValid={userIsValid}
        setUserIsValid={setUserIsValid}
        deleteUser={deleteUser}
        >
        </EditUserComp>}>
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