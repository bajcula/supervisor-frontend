import React, {useState, useEffect} from "react";
import SingleWorkerComp from "./SingleWorkerComp/SingleWorkerComp";
import NewWorkerComp from "./NewWorkerComp/NewWorkerComp";
import TextField from '@mui/material/TextField';
import SplitButton from "./SplitButtonComp/SplitButtonComp";




const WorkersContainerComp = () => {
    const [showNewModal, setShowNewModal] = useState(false)
    const [workers, setWorkers] = useState([])
    const [ServerError, setServerError] = useState("")
    const [isValid, setIsValid] = useState({valid: true, message:""})
    const [searchByName, setSearchByName] = useState(true)
    const [newWorker, setNewWorker] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        department: "",
        goals: "",
        bonusTracker: 0,
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    })

    const searchByNameFunc = (localSearch) => {
        const newSearchedWorkers = workers.filter((worker)=>worker.firstName.toUpperCase().includes(localSearch.toUpperCase()) || worker.lastName.toUpperCase().includes(localSearch.toUpperCase())) 
        setWorkers(newSearchedWorkers)
        console.log(workers)
    }

    const searchByDeptFunc = (localSearch) => {
        const newSearchedWorkers = workers.filter((worker)=>worker.department.toUpperCase().includes(localSearch.toUpperCase())) 
        setWorkers(newSearchedWorkers)
    }


    let handleSearch = (e) => {
        e.preventDefault();
        let localSearch = e.target.value
        console.log('running')
        if (searchByName) {
            searchByNameFunc(localSearch)
        } else {
            searchByDeptFunc(localSearch)
        }
    }



    const addNewWorker = async (newWorker) => {
        const apiResponse = await fetch ("http://localhost:3001/workers", {
            method: "POST",
            body: JSON.stringify(newWorker),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json()
        console.log(parsedResponse)
        if (parsedResponse.success) {
            getWorkers()
        } else {
            setServerError(parsedResponse.data)
        }
    }
    const getWorkers = async () => {
        try {
            const workers = await fetch("http://localhost:3001/workers")
            const parsedWorkers = await workers.json()
            setWorkers(parsedWorkers.data)
        }catch(err){
            console.log(err)
        }
    }
    const deleteWorker = async (idToDelete, workerToDelete) => {
        try {
            const apiResponse = await fetch(`http://localhost:3001/workers/${idToDelete}`, {
                method:"DELETE",
                body: JSON.stringify(workerToDelete),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json()
            console.log(parsedResponse)
            if (parsedResponse.success) {
                const newWorkers = workers.filter(worker=>worker._id!==idToDelete)
                setWorkers(newWorkers)
            }else{
                setServerError(parsedResponse.data)
            }
        }catch(err){
            alert("front end error")
        }
    }

    const updateWorker = async (idToUpdate, workerToUpdate) => {
        const apiResponse = await fetch(`http://localhost:3001/workers/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify(workerToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json()
        
        if (parsedResponse.success) {
            const newWorkers = workers.map(worker => worker._id === idToUpdate ? workerToUpdate : worker)
            setWorkers(newWorkers)
        }else {
            setServerError(parsedResponse.data)
        }
    }

  

    useEffect(()=> {
        async function fetchData() {
            await getWorkers()
        }
        fetchData()
    }, [])

    return (
        <div>
            <div id='search-div'>
                <TextField onChange={handleSearch} id="search-bar" label="search" variant="outlined" /> 
                <SplitButton setSearchByName={setSearchByName}>SPLIT</SplitButton>

            </div>
            <br/>
            <NewWorkerComp
            key={"1"}
            ServerError={ServerError}
            addNewWorker={addNewWorker}
            newWorker={newWorker}
            isValid={isValid}
            setNewWorker={setNewWorker}
            setIsValid={setIsValid}
            showNewModal={showNewModal}
            setShowNewModal={setShowNewModal}
            />
            <h6>This is the list of your current employees.</h6>
            <div id='single-workers-div'> 
                    {workers.map((worker)=>{
                        return (
                            <SingleWorkerComp
                            key={worker._id}
                            isValid={isValid}
                            setIsValid={setIsValid}
                            deleteWorker={deleteWorker}
                            worker={worker}
                            updateWorker={updateWorker}/>
                        )
                    })}
            </div>

        </div>
    )
}

export default WorkersContainerComp