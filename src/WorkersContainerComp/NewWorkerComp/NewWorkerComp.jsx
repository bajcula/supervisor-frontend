import React from "react";

const NewWorkerComp = (props) => {
    const handleNewInputChange = (e) => {
        props.setNewWorker({
            ...props.newWorker,
            [e.target.name]: e.target.value
        })
    }
    const submissionNew = (e) => {
            e.preventDefault()
            let validSubmission = true
            if (props.newWorker.firstName.length < 2) {
                props.setIsValid({
                    valid:false,
                    message: "Sorry, the employee name can't be a single character."
                })
                validSubmission = false
            }
            if (props.newWorker.lastName.length < 2) {
                props.setIsValid({
                    valid:false,
                    message: "Sorry, the employee last name can't be a single character."
                })
                validSubmission = false
            }
            if (validSubmission===true) {
                props.addNewWorker(props.newWorker)
                props.setNewWorker({
                    firstName: "",
                    lastName: "",
                    email: "",
                    age: 0,
                    department: "",
                    goals: "",
                    bonusTracker: 0,
                    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                })
                props.setIsValid({
                    valid:true,
                    message:""
                })
                props.setShowForm(false)
            }
            validSubmission = true
        }
    return (
        <>
        {props.showForm ?
            <div id='new-worker-form'>
                <h3>Add new worker: <button onClick={()=>props.setShowForm(!props.showForm)}>CANCEL</button></h3> <br/>
                <form id='new-form' onSubmit={submissionNew}>
                    { props.isValid.valid ? null : <p className="err-msg">{props.isValid.message}</p> }
                    { props.serverError ? <p className="err-msg">{props.serverError}</p> : null }
                    First name: <input className="input" onChange={handleNewInputChange} type='text' required name='firstName' value={props.newWorker.firstName}/>
                    Last name: <input className="input" onChange={handleNewInputChange} type='text' required name='lastName' value={props.newWorker.lastName}/>      
                    Email: <input className="input" onChange={handleNewInputChange} type='text' required name='email' value={props.newWorker.email}/>      

                    Age: <input className="input" onChange={handleNewInputChange} type='number' required name='age' value={props.newWorker.age}/>      
                    Department: <input className="input" onChange={handleNewInputChange} type='text' required  name='department' value={props.newWorker.department}/>     
                    Goals: <input className="input" onChange={handleNewInputChange} type='text' required  name='goals' value={props.newWorker.goals}/>

                    Image: <input className="input" onChange={handleNewInputChange} type='text' name='img'/>
                    <br/>Add this person to your team? <button type="submit">YES, PLEASE!</button>
                </form>
                
            </div>
        :
            <button id='add-new-button' onClick={()=>props.setShowForm(!props.showForm)}>ADD A NEW EMPLOYEE</button>  
        }
        </>
    )
}

export default NewWorkerComp