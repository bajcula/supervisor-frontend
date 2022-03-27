import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faAnglesLeft} from '@fortawesome/free-solid-svg-icons';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import { faAngleUp} from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faAnglesLeft, faAnglesRight, faAngleLeft, faAngleRight, faAngleUp);

const SingleWorkerComp = (props) => {
    const [showItem, setShowItem] = useState(false)
    const [lgShow, setLgShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false)
    const [editedWorker, setEditedWorker] = useState({
        firstName: props.worker.firstName,
        lastName: props.worker.lastName,
        email: props.worker.email,
        age: props.worker.age,
        img: props.worker.img,
        department: props.worker.department,
        goals: props.worker.goals,
        bonusTracker: props.worker.bonusTracker,
        _id: props.worker._id
    })
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
        console.log(editedWorker.bonusTracker)
        console.log(newBonus)
        setEditedWorker({
            ...editedWorker,
            bonusTracker: newBonus
        })
        console.log(editedWorker.bonusTracker)
        props.updateWorker(props.worker._id, editedWorker)
    }
    const bonusMinus = () => {
        let newBonus = editedWorker.bonusTracker - 1
        console.log(editedWorker.bonusTracker)
        console.log(newBonus)
        setEditedWorker({
            ...editedWorker,
            bonusTracker: newBonus
        })
        console.log(editedWorker.bonusTracker)
        props.updateWorker(props.worker._id, editedWorker)
        
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
            {showItem ?
            <>
            
            <p><i>Department:</i> {props.worker.department}</p>
            <p><i>Goals:</i> {props.worker.goals}</p>
            <button id='view-btn' onClick={()=>setLgShow(true)}>VIEW</button>
            <button id='delete-btn' onClick={()=>props.deleteWorker(props.worker._id)}>DELETE</button>
                    <p onClick={()=>setShowItem(false)} className="md">x</p>
            </>
            :
            <p id='see-more' onClick={()=>setShowItem(true)}><i>Click to see more?</i></p>
            }
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
                    <p><u>Age:</u> {props.worker.age}</p>
                    <p><u>Goals:</u> {props.worker.goals}</p>
                    <p id='bonus'>

                        <b>BONUS:</b>
                        {editedWorker.bonusTracker === -2?
                        <span id='minus2'><FontAwesomeIcon icon="fa-solid fa-angles-left" /></span>
                        :
                        <></>
                        }
                        {editedWorker.bonusTracker === -1?
                        <span id='minus1'><FontAwesomeIcon icon="fa-solid fa-angle-left" /></span>
                        :
                        <></>
                        }
                        {editedWorker.bonusTracker === 0?
                        <span id='zero'><FontAwesomeIcon icon="fa-solid fa-angle-up" /></span>
                        :
                        <></>
                        }
                        {editedWorker.bonusTracker === 1?
                        <span id='plus1'><FontAwesomeIcon icon="fa-solid fa-angle-right" /></span>
                        :
                        <></>
                        }
                        {editedWorker.bonusTracker === 2?
                        <span id='plus2'><FontAwesomeIcon icon="fa-solid fa-angles-right" /></span>
                        :
                        <></>
                        }

                        
                        <br/>

                        
                    </p>
                    {editedWorker.bonusTracker !== -2?
                        <button className="plusminus" onClick={bonusMinus}>-</button>:
                        <></>
                        }
                        {editedWorker.bonusTracker !== 2?
                        <button className="plusminus" onClick={bonusPlus}>+</button>:
                        <></>
                        }
                        <br/>
                    <button id='edit-btn' onClick={openEditModal}>EDIT</button>
                
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
                        
                        <p>Image Link: <input className="input" onChange={handleEditInputChange} type='text' name='img'/></p>
                        <p>First Name: <input className="input" onChange={handleEditInputChange} type='text' required name='firstName' value={editedWorker.firstName}/></p>
                        <p>Last Name: <input className="input" onChange={handleEditInputChange} type='text' required name='lastName' value={editedWorker.lastName}/></p>      
                        <p>Email: <input className="input" onChange={handleEditInputChange} type='text' required name='email' value={editedWorker.email}/></p>      
                        <p>Age: <input className="input" onChange={handleEditInputChange} type='number' required name='age' value={editedWorker.age}/> </p>     
                        <p>Department: <input className="input" onChange={handleEditInputChange} type='text' required  name='department' value={editedWorker.department}/> </p>    
                        <p>Goals: <input className="input" onChange={handleEditInputChange} type='text' required  name='goals' value={editedWorker.goals}/> </p>    
                        <br/>
                        Edit employee info? <button type="submit">YES</button>
                    </form>
                    </>
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default SingleWorkerComp