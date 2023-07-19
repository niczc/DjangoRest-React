import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {addPatient, editPatient, deletePatient} from "../services/ApiService";
import AddPatient from "./AddPatient";
import EditPatient from "./EditPatient";

export default function PatientList() {

    const [patients, setPatients] = useState([]);
    const [showAddPacientForm, setShowAddPacientForm] = useState(false)
    const [showEditPacientForm, setShowEditPacientForm] = useState(false)
    const [selectedEditData, setSelectedEditdata] = useState()

    useEffect(() => {
        axios.get('http://localhost:8000/patient/')
            .then(response => {
                setPatients(response.data.results)
                console.log('oi',response.data)
            })
            .catch(error => {
                console.error('Error: ', error)
            })
    }, [])

    const handleAddSubmit = (e) => {
        addPatient(e.target)
            .then(res => {
                setPatients(res)
            })
    }

    const handleEditBtn = (patient) => {
        setSelectedEditdata(patient)
        setShowEditPacientForm(true)
        setShowAddPacientForm(false)
    }

    const handleEditSubmit = (e, id) => {
        editPatient(id, e.target)
            .then(res => {
                setPatients(res)
        })
    }

    function handleCancelBtn() {
        setShowAddPacientForm(false)
    }

    const handleDeleteBtn = (id) => {
        deletePatient(id)
            .then(res => {
                setPatients(patients.filter(p=> p.patient_id !== id))
            })
    }

    return (
        <>
            <h3>PATIENT LIST</h3>
            <table border={"2px"} cellPadding={"10px"}>
                <thead>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Blood Group</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => {
                        return (<tr key={patient.patient_id}>
                            <td>{patient.first_name}</td>
                            <td>{patient.last_name}</td>
                            <td>{patient.blood}</td>
                            <td>
                                <button onClick={() => handleEditBtn(patient)}>Edit</button>
                                <button onClick={() => handleDeleteBtn(patient.patient_id)}>Delete</button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <button onClick={()=>setShowAddPacientForm(true)}>Add New Patient</button>
            {showAddPacientForm && <AddPatient handleAddSubmit={handleAddSubmit} handleCancelBtn={handleCancelBtn}/>}
            {showEditPacientForm && <EditPatient handleEditSubmit={handleEditSubmit} handleCancelBtn={handleCancelBtn} selectedEditData = {selectedEditData}/>}
        </>
    )
}
