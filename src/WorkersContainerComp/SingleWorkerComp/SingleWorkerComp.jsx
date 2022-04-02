import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal'
import { Button, TextareaAutosize } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './SingleWorker.css'
library.add(faEnvelope)

const SingleWorkerComp = (props) => {
    const [lgShow, setLgShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false)
    const [editedWorker, setEditedWorker] = useState({
        firstName: props.worker.firstName,
        lastName: props.worker.lastName,
        email: props.worker.email,
        salary: props.worker.salary,
        age: props.worker.age,
        img: props.worker.img,
        department: props.worker.department,
        goals: props.worker.goals,
        bonusTracker: props.worker.bonusTracker,
        _id: props.worker._id
    })
    const setBonusTo = (e) => {
        let localEdited
        let newSalary = Math.round(editedWorker.salary * 1.1)
        e.preventDefault()
        if (e.target.name === "minus1") {
            localEdited = {
                ...editedWorker,
                bonusTracker: -1
            }
        } else if (e.target.name === "zero") {
            localEdited = {
                ...editedWorker,
                bonusTracker: 0
            }
        } else if (e.target.name === "one") {
            localEdited = {
                ...editedWorker,
                bonusTracker: 1
            }
        } else if (e.target.name === "two") {
            localEdited = {
                ...editedWorker,
                bonusTracker: -2,
                salary: newSalary
            }
        }
        setEditedWorker(localEdited)
        props.updateWorker(props.worker._id, localEdited)
        props.setHasBeenEdited(!props.hasBeenEdited)
        if (props.searchedShow) {
            const newSearchedWorkers = props.searchedWorkers.map(thisworker=>thisworker._id===props.worker._id? localEdited:thisworker)
            props.setSearchedWorkers(newSearchedWorkers)
        }
    }
    const openEditModal = () => {
        setEditModalShow(true)
    }
    const handleEditInputChange = (e) => {
        setEditedWorker({
            ...editedWorker,
            [e.target.name]: e.target.value
        })
    }
    const bonusPlus = () => {
        let newBonus = editedWorker.bonusTracker + 1
        let newSalary = Math.round(editedWorker.salary * 1.1)
        let localEdited
        if (newBonus === 2) {
            localEdited = {
                ...editedWorker,
                bonusTracker: -2,
                salary: newSalary
            }
        } else {
            localEdited = {
                ...editedWorker,
                bonusTracker: newBonus
            }
        }
        setEditedWorker(localEdited)
        props.updateWorker(props.worker._id, localEdited)
    }
    const bonusMinus = () => {
        let newBonus = editedWorker.bonusTracker - 1
        let localEdited = {
            ...editedWorker,
            bonusTracker: newBonus
        }
        setEditedWorker(localEdited)
        props.updateWorker(props.worker._id, localEdited)
    }
    const submissionEdit = () => { 
        console.log('is it')
            let validSubmission = true
            if (editedWorker.firstName.length < 2) {
                props.setIsValid({
                    valid:false,
                    message: "Sorry, the updated employee name can't be a single character."
                })
                validSubmission = false
            }
            if (editedWorker.lastName.length < 2) {
                props.setIsValid({
                    valid:false,
                    message: "Sorry, the updated employee last name can't be a single character."
                })
                validSubmission = false
            }
            if (validSubmission===true) {
                console.log('entering HERE')
                props.updateWorker(props.worker._id, editedWorker)
                props.setIsValid({
                    valid:true,
                    message:""
                })
                setEditModalShow(false)
                console.log('is it happening')
                setLgShow(true)
            }            
        }

    return (
        <section className="single-worker">
            <h4><b>{props.worker.firstName} {props.worker.lastName} ({props.worker.age})</b></h4>
            <img height='100px' width='100px' src={props.worker.img} alt='profile-thumbnail'></img>
            <p><br/><b>Department:</b> {props.worker.department}</p>
            <p><b>Salary($):</b> {props.worker.salary}</p>
            <Button id='view-btn' onClick={()=>setLgShow(true)} variant="contained">
                VIEW
            </Button>
            
            <Modal
            dialogClassName="view-modal"
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
            centered
            >
                <Modal.Header 
                closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <p><b>{editedWorker.firstName}<br/> {editedWorker.lastName}</b></p>
                        <img height='100px' width='100px' src={editedWorker.img} alt='profile-thumbnail'></img>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <><b>Department:</b> {editedWorker.department}</> <br/>
                    <><b>Email:</b> {editedWorker.email} <a href={`mailto:${editedWorker.email}`}> <FontAwesomeIcon id='envelope' icon="fa-solid fa-envelope" /></a> </><br/>
                    <><b>Salary($)</b>: {editedWorker.salary}</><br/>
                    <><b>Age:</b> {editedWorker.age}</><br/>
                    <><b>Goals:</b> {editedWorker.goals}</><br/><br/>
                    <div id='bonus'>
                        <section id='raise-control'>
                            <b>Raise Track:</b>
                            <button
                            disabled={editedWorker.bonusTracker === -2}
                            className="plusminus"
                            onClick={bonusMinus}
                            >
                            -
                            </button>
                    
                            <button
                            disabled={editedWorker.bonusTracker === 2}
                            className="plusminus"
                            onClick={bonusPlus}
                            >
                            +
                            </button>
                        </section> <br/>   
                        <section id='section-raise'>
                            {editedWorker.bonusTracker > -1.5?
                            <button onClick={setBonusTo} name='minus1' className='bonus-btn-on bonus-btn'></button>
                            :
                            <button onClick={setBonusTo} name='minus1' className='bonus-btn'></button>
                            }
                            {editedWorker.bonusTracker > -0.5?
                            <button onClick={setBonusTo} name='zero' className='bonus-btn-on bonus-btn'></button>
                            :
                            <button onClick={setBonusTo} name='zero' className='bonus-btn'></button>
                            }
                            {editedWorker.bonusTracker > 0.5?
                            <button onClick={setBonusTo} name='one'  className='bonus-btn-on bonus-btn'></button>
                            :
                            <button onClick={setBonusTo} name='one'  className='bonus-btn'></button>
                            }
                            {editedWorker.bonusTracker < 1.5 &&
                            <button id='perc10' onClick={setBonusTo} name='two'  className='bonus-btn'>+10%</button>
                            }
                        </section>
                    </div>
                    


                    <br/>
                    <Button id='edit-btn' variant="contained" onClick={openEditModal}>EDIT</Button>
                    <Button id='delete-btn-view' color="warning" variant="contained" onClick={()=>props.deleteWorker(props.worker._id)}>DELETE</Button>
 
                
                </Modal.Body>
            </Modal>
            <Modal
            dialogClassName="edit-modal"
            size="lg"
            show={editModalShow}
            onHide={() => {
                setEditModalShow(false)
                props.setIsValid({
                    valid:true,
                    message:""
                })
            }}
            aria-labelledby="example-modal-sizes-title-lg"
            centered
            >
                <Modal.Header 
                closeButton>
                    <Modal.Title id="edit-title">
                        
                        <p>EDIT <br/>EMPLOYEE</p>
                        <img height='100px' width='100px' src={editedWorker.img} alt='profile-thumbnail'></img>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <>
                    <form id='edit-form-modal' onSubmit={submissionEdit}>
                        { props.isValid.valid ? null : <p className="err-msg">{props.isValid.message}</p> }
                        <div className="edit-form-row">
                        First Name: <input className="input" onChange={handleEditInputChange} type='text' required name='firstName' value={editedWorker.firstName}/>
                        </div>
                        <div className="edit-form-row">
                        Last Name: <input className="input" onChange={handleEditInputChange} type='text' required name='lastName' value={editedWorker.lastName}/>  
                        </div>
                        <div className="edit-form-row">
                        Email: <input className="input" onChange={handleEditInputChange} type='text' required name='email' value={editedWorker.email}/>
                        </div>
                        <div className="edit-form-row">
                        Salary($): <input className="input" onChange={handleEditInputChange} type='number' required name='salary' value={editedWorker.salary}/>
                        </div>
                        <div className="edit-form-row">
                        Image Link: <input className="input" onChange={handleEditInputChange} type='text' name='img'/>
                        </div>
                        <div className="edit-form-row">
                        Age: <input className="input" onChange={handleEditInputChange} type='number' required name='age' value={editedWorker.age}/>    
                        </div>
                        <div className="edit-form-row">
                        Department: <input className="input" onChange={handleEditInputChange} type='text' required name='department' value={editedWorker.department}/> 
                        </div>
                        <div className="edit-form-row">
                        Goals:
                        <TextareaAutosize minRows={3} onChange={handleEditInputChange} className="text-area" required name='goals' value={editedWorker.goals}></TextareaAutosize>
                        </div>
                        <br/>     
                        Edit employee info? <Button id='submit-edit-btn' variant="contained" type="submit">YES</Button>
                    </form>
                    </>
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default SingleWorkerComp