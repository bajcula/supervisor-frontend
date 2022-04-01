import React, {useState, useEffect} from "react";
import SingleWorkerComp from "./SingleWorkerComp/SingleWorkerComp";
import NewWorkerComp from "./NewWorkerComp/NewWorkerComp";
import SearchComp from "../SearchComp/SearchComp";
import SplitButtonSort from "./SplitButtonComp/SplitButtonSort";
import apiUrl from "../apiConfig";

const WorkersContainerComp = (props) => {
    const [showNewModal, setShowNewModal] = useState(false)
    const [workers, setWorkers] = useState([])
    const [searchedShow, setSearchedShow] = useState(false)
    const [searchedWorkers, setSearchedWorkers] = useState([])
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
        user: "",
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
        const apiResponse = await fetch (`${apiUrl}/workers`, {
            method: "POST",
            body: JSON.stringify(newWorker),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json()
        console.log(parsedResponse)
        const theCurrentUserId = await JSON.parse(localStorage.getItem('user'))._id
        if (parsedResponse.success) {
            getWorkers(theCurrentUserId)
        } else {
            props.setServerError(parsedResponse.data)
        }
    }

    const getWorkers = async (UserId) => {
        try {
            const workers = await fetch(`${apiUrl}/workers/${UserId}`)
            const parsedWorkers = await workers.json()
            setWorkers(parsedWorkers.data)
        }catch(err){
            console.log(err)
        }
    }

    const deleteWorker = async (idToDelete, workerToDelete) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/workers/${idToDelete}`, {
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
                props.setServerError(parsedResponse.data)
            }
        }catch(err){
            alert("front end error")
        }
    }
    const updateWorker = async (idToUpdate, workerToUpdate) => {
        const apiResponse = await fetch(`${apiUrl}/workers/${idToUpdate}`, {
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
            if(searchedShow) {
                const newSearchedWorkers = searchedWorkers.map(worker => worker._id === idToUpdate ? workerToUpdate : worker)
                setSearchedWorkers(newSearchedWorkers)
            }
        }else {
            props.setServerError(parsedResponse.data)
        }
    }

    const sortWorkers = (propertyName) => {
        if(searchedShow){
            const sortedSearchedWorkers = searchedWorkers.sort((a,b)=>(a[propertyName] >= b[propertyName]) ? 1 : -1)
            setSearchedWorkers(sortedSearchedWorkers)
            setHasBeenEdited(!hasBeenEdited)
        } else {
            let sortedWorkers = [...workers]
            sortedWorkers = sortedWorkers.sort((a, b)=>(a[propertyName] >= b[propertyName]) ? 1 : -1)
            setWorkers(sortedWorkers)
        }
    }

    function fetchData() {
        if (localStorage.getItem('user')) {
            const getUser = JSON.parse(localStorage.getItem('user'))
            getWorkers(getUser._id)
        }
    }

    useEffect(()=> {
        fetchData()
    }, [hasBeenEdited])


    return (
        <div id='main'>

            <NewWorkerComp
            currentUser={props.currentUser}
            key={"1"}
            ServerError={props.serverError}
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
                searchedWorkers={searchedWorkers}
                hasBeenEdited={hasBeenEdited}
                setHasBeenEdited={setHasBeenEdited}
                >    
                </SplitButtonSort>
                    {searchedShow ?
                    <>
                    {searchedWorkers.map((worker)=>{
                        return (
                            <SingleWorkerComp
                            searchedShow={searchedShow}
                            searchedWorkers={searchedWorkers}
                            setSearchedWorkers={setSearchedWorkers}
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