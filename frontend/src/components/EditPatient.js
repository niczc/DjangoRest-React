import React from 'react'

export default function EditPatient({handleEditSubmit,handleCancelBtn, selectedEditData}) {
    return (
       <>
           <h3>EDIT FORM:</h3>
            <form onSubmit={(e) => handleEditSubmit(e, selectedEditData.patient_id)}>
                First Name <input type="text" name='first_name' defaultValue={selectedEditData.first_name}/>
                Last Name <input type="text" name='last_name'  defaultValue={selectedEditData.last_name}/>
                Blood Type <input type="text" name='blood'  defaultValue={selectedEditData.blood}/>
                <button type='submit'>EDIT</button>
                <button onClick={handleCancelBtn}>Cancel</button>
            </form>
       </>
    )
}
