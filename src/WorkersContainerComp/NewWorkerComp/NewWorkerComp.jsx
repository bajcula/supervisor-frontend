import { Button } from "@mui/material";
import React from "react";
import Modal from 'react-bootstrap/Modal'

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
                    salary: "",
                    age: "",
                    department: "",
                    goals: "",
                    bonusTracker: 0,
                    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                })
                props.setIsValid({
                    valid:true,
                    message:""
                })
                props.setShowNewModal(false)
            }
            validSubmission = true
        }
    return (
        <>
        {props.showNewModal ?
        <Modal  
        size="lg"
        show={props.showNewModal}
        onHide={() => props.setShowNewModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="edit-title">
                    <p>ADD NEW <br/>EMPLOYEE</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id='new-form-modal' onSubmit={submissionNew}>
                    { props.isValid.valid ? null : <p className="err-msg">{props.isValid.message}</p> }
                    { props.serverError ? <p className="err-msg">{props.serverError}</p> : null }
                        First name: <input className="input" onChange={handleNewInputChange} type='text' required name='firstName' value={props.newWorker.firstName}/> <br/>
                        Last name: <input className="input" onChange={handleNewInputChange} type='text' required name='lastName' value={props.newWorker.lastName}/>    <br/>  
                        Email: <input className="input" onChange={handleNewInputChange} type='text' required name='email' value={props.newWorker.email}/>   <br/>   
                        Salary: <input className="input" onChange={handleNewInputChange} type='text' required name='salary' value={props.newWorker.salary}/>   <br/>   
                        Image Link: <input className="input" onChange={handleNewInputChange} type='text' name='img' /> <br/>
                        Age: <input className="input" onChange={handleNewInputChange} type='number' required name='age' value={props.newWorker.age}/>   <br/>   
                        Department: <input className="input" onChange={handleNewInputChange} type='text' required  name='department' value={props.newWorker.department}/> <br/>    
                        <div className="goals-text">Goals:</div> <textarea rows='5' cols='35' className="input" onChange={handleNewInputChange} type='text' required name='goals' value={props.newWorker.goals}/><br/> 
                        Add this person to your team? <button id='add-new-form-btn' type="submit">YES, PLEASE!</button>
                </form>
            </Modal.Body>
        </Modal>
        :
            <Button id='add-new-btn' variant="contained" onClick={()=>props.setShowNewModal(!props.showNewModal)}>Add new employee</Button>
        }
        </>
    )
}

export default NewWorkerComp