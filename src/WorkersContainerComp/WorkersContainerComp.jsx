import React, {useState, useEffect} from "react";
import SingleWorkerComp from "./SingleWorkerComp/SingleWorkerComp";
import NewWorkerComp from "./NewWorkerComp/NewWorkerComp";
import SearchComp from "../SearchComp/SearchComp";

import SplitButtonSort from "./SplitButtonComp/SplitButtonSort";

const WorkersContainerComp = () => {
    const [showNewModal, setShowNewModal] = useState(false)
    const [workers, setWorkers] = useState([])
    const [searchedShow, setSearchedShow] = useState(false)
    const [searchedWorkers, setSearchedWorkers] = useState([])
    const [ServerError, setServerError] = useState("")
    const [isValid, setIsValid] = useState({valid: true, message:""})
    const [searchByName, setSearchByName] = useState(true)
    const [hasBeenEdited, setHasBeenEdited] = useState(false)
    const [newWorker, setNewWorker] = useState({
        firstName: "",
        lastName: "",
        email: "",
        salary: "",
        age: "",
        department: "",
        goals: "",
        bonusTracker: 0,
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    })
    const searchByNameFunc = (stringToSearch) => {
        setSearchByName(true)
        const newSearchedWorkers = workers.filter((worker)=>worker.firstName.toUpperCase().includes(stringToSearch.toUpperCase()) || worker.lastName.toUpperCase().includes(stringToSearch.toUpperCase())) 
        setSearchedWorkers(newSearchedWorkers)
    }
    const searchByDeptFunc = (stringToSearch) => {
        setSearchByName(false)
        const newSearchedWorkers = workers.filter((worker)=>worker.department.toUpperCase().includes(stringToSearch.toUpperCase())) 
        setSearchedWorkers(newSearchedWorkers)
    }
    let searchString
    let handleSearch = (e) => {
        searchString = e.target.value
        if (searchString === "") {
            setSearchedShow(false)
        } else {
            setSearchedShow(true)
        }
        if (searchByName) {
            searchByNameFunc(searchString)
        } else {
            searchByDeptFunc(searchString)
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
        // sortWorkers("lastName")
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

    const sortWorkers = (propertyName) => {
        console.log('entering sort func')
        if(searchedShow){
            const sortedSearchedWorkers = searchedWorkers.sort((a,b)=>(a[propertyName] >= b[propertyName]) ? 1 : -1)
            console.log('its sorting searched')
            setSearchedWorkers(sortedSearchedWorkers)
        } else {
            let sortedWorkers = [...workers]
            sortedWorkers = sortedWorkers.sort((a, b)=>(a[propertyName] >= b[propertyName]) ? 1 : -1)
            setWorkers(sortedWorkers)
            console.log(sortedWorkers)
        }
    }

    useEffect(()=> {
        console.log("first useeffect")
        async function fetchData() {
            await getWorkers()
        }
        fetchData()
    }, [])

    return (
        <div>
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
            <SearchComp
            searchString={searchString} 
            searchByNameFunc={searchByNameFunc}
            searchByDeptFunc={searchByDeptFunc}
            hasBeenEdited={hasBeenEdited}
            setHasBeenEdited={setHasBeenEdited}
            handleSearch={handleSearch}
            searchByName={searchByName}
            setSearchByName={setSearchByName}
            />    

            <div id='single-workers-div'> 
                <p>This is the list of your current employees.</p>
                <span id='sort-by'>Sort by:</span>
                <SplitButtonSort
                sortWorkers={sortWorkers}

                >    
                </SplitButtonSort>

                    {searchedShow ?
                    <>
                    {searchedWorkers.map((worker)=>{
                        return (
                            <SingleWorkerComp
                            hasBeenEdited={hasBeenEdited}
                            setHasBeenEdited={setHasBeenEdited}
                            key={worker._id}
                            isValid={isValid}
                            setIsValid={setIsValid}
                            deleteWorker={deleteWorker}
                            worker={worker}
                            updateWorker={updateWorker}/>
                        )
                    })}
                    </>
                    :
                    <>
                    {workers.map((worker)=>{
                        return (
                            <SingleWorkerComp
                            hasBeenEdited={hasBeenEdited}
                            setHasBeenEdited={setHasBeenEdited}
                            key={worker._id}
                            isValid={isValid}
                            setIsValid={setIsValid}
                            deleteWorker={deleteWorker}
                            worker={worker}
                            updateWorker={updateWorker}/>
                        )
                    })}
                    </>
                    }
            </div>
        </div>
    )
}

export default WorkersContainerComp