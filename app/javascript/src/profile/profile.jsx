import React, { useState, useEffect } from 'react'
import './profile.scss'
import Sidebar from '../myDiary/sidebar'
import '../myDiary/sidebar.scss'
import { safeCredentialsForm, authenticityHeader, handleErrors, safeCredentials, token} from '../utils/fetchHelper';

const Profile = () => {
    const [id, setId] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        fetch(`api/sessions/authenticated/${token()}`, safeCredentials(
            {
                method: 'GET',
                headers: {
                    ...authenticityHeader(),
                    'Content-Type': 'application/json'
                }
            }
        ))
        .then(handleErrors)
        .then(response => {
            console.log('Response Data:', response);
            setId(response.user_id);
        })
        .catch(error => {
            console.log('Error:', error);
        })
    })

    const handleSubmit = (e) => {
        e.preventDefault();
      
        console.log('Submit clicked');
    }
      

  return (
    <div className='profile-page'>
        <div className='row'>
            <div className='col-3 sidebarContainer'>
                <Sidebar />
            </div>
            <div className=' col-9 profile container rounded'>
                <h1 className='text-center'>Profile</h1>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='username'>Username</label>
                        <input type='username' className='form-control' id='username' placeholder='Enter username' />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input type='email' className='form-control' id='email' placeholder='Enter email' />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='salary_after_taxes'>Salary After Taxes</label>
                        <input type='number' step='.01' className='form-control' id='salary_after_taxes' placeholder='Enter salary after taxes' />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='password'>Password</label>
                        <input type='password' className='form-control' id='password' placeholder='Enter your password' />
                    </div>
                    <div className='submit'>
                        <button type='submit' className='btn btn-lg submit-btn'>Submit</button>
                    </div>
                </form>
                {successMessage && <div className='success-message'>{successMessage}</div>}
            </div>
        </div>
    </div>
  )
}

export default Profile