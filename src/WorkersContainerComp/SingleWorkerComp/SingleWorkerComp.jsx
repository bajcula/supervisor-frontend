import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import { Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
// import { faAnglesLeft} from '@fortawesome/free-solid-svg-icons';
// import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
// import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import { faAngleLeft} from '@fortawesome/free-solid-svg-icons';
// import { faAngleUp} from '@fortawesome/free-solid-svg-icons';
// import { library } from "@fortawesome/fontawesome-svg-core";
// library.add(faAnglesLeft, faAnglesRight, faAngleLeft, faAngleRight, faAngleUp);

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
    }
    const openEditModal = () => {
        setEditModalShow(true)
        setLgShow(false)
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
    const submissionEdit = (e) => {
            e.preventDefault()
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
                props.updateWorker(props.worker._id, editedWorker)
                props.setIsValid({
                    valid:true,
                    message:""
                })
                setEditModalShow(false)
                setLgShow(true)
            }
            validSubmission = true
        }
    return (
        <section className="single-worker">
            <h2><b>{props.worker.firstName} {props.worker.lastName}</b></h2>
            <img height='100px' width='100px' src={props.worker.img} alt='profile-thumbnail'></img>
            <p><br/><i>Department:</i> {props.worker.department}</p>
            <p><i>Goals:</i> {props.worker.goals}</p>
            <Button id='view-btn' onClick={()=>setLgShow(true)} variant="contained">
                VIEW
            </Button>
            
            <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
            centered
            >
                <Modal.Header 
                closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {props.worker.firstName} {props.worker.lastName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><u>Department:</u> {props.worker.department}</p>
                    <p><u>Email:</u> {props.worker.email}</p>
                    <p><u>Yearly Salary($):</u> {props.worker.salary}</p>
                    <p><u>Age:</u> {props.worker.age}</p>
                    <p><u>Goals:</u> {props.worker.goals}</p>
                    <p id='bonus'>
                        <b>RAISE:</b>


                        {editedWorker.bonusTracker > -1.5?
                        <button onClick={setBonusTo} name='minus1' className='bonus-btn-on bonus-btn'></button>
                        :
                        <button onClick={setBonusTo} name='minus1' className='bonus-btn-off bonus-btn'></button>
                        }
                        {editedWorker.bonusTracker > -0.5?
                        <button onClick={setBonusTo} name='zero' className='bonus-btn-on bonus-btn'></button>
                        :
                        <button onClick={setBonusTo} name='zero' className='bonus-btn-off bonus-btn'></button>
                        }
                        {editedWorker.bonusTracker > 0.5?
                        <button onClick={setBonusTo} name='one'  className='bonus-btn-on bonus-btn'></button>
                        :
                        <button onClick={setBonusTo} name='one'  className='bonus-btn-off bonus-btn'></button>
                        }
                        {editedWorker.bonusTracker < 1.5 &&
                        <button onClick={setBonusTo} name='two'  className='bonus-btn-off bonus-btn'>R</button>
                        }
                        <br/>
                    </p>
                    
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
                    
                        <br/>
                    <button id='edit-btn' onClick={openEditModal}>EDIT</button>
                    <button id='delete-btn' onClick={()=>props.deleteWorker(props.worker._id)}>DELETE</button>
                
                </Modal.Body>
            </Modal>
            <Modal
            
            size="lg"
            show={editModalShow}
            onHide={() => setEditModalShow(false)}
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
                        
                        First Name: <input className="input" onChange={handleEditInputChange} type='text' required name='firstName' value={editedWorker.firstName}/> <br/>
                        Last Name: <input className="input" onChange={handleEditInputChange} type='text' required name='lastName' value={editedWorker.lastName}/> <br/>    
                        Email: <input className="input" onChange={handleEditInputChange} type='text' required name='email' value={editedWorker.email}/> <br/>
                        Yearly Salary($): <input className="input" onChange={handleEditInputChange} type='number' required name='salary' value={editedWorker.salary}/> <br/>
                        Image Link: <input className="input" onChange={handleEditInputChange} type='text' name='img'/><br/>
                        Age: <input className="input" onChange={handleEditInputChange} type='number' required name='age' value={editedWorker.age}/><br/>     
                        Department: <input className="input" onChange={handleEditInputChange} type='text' required name='department' value={editedWorker.department}/>  <br/> 
                        <div className="goals-text">Goals:</div> <textarea rows='5' cols='35' className="input" onChange={handleEditInputChange} type='text' required name='goals' value={editedWorker.goals}/><br/>     
                        Edit employee info? <button id='submit-edit-btn' type="submit">YES</button>
                    </form>
                    </>
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default SingleWorkerComp