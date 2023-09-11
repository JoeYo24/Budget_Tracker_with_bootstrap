import React from 'react'
import './profile.scss'
import Sidebar from '../myDiary/sidebar'
import '../myDiary/sidebar.scss'

const Profile = () => {

  return (
    <div className='profile-page'>
        <div className='row'>
            <div className='col-3 sidebarContainer'>
                <Sidebar />
            </div>
            <div className=' col-9 profile container rounded'>
                <h1 className='text-center'>Profile</h1>
                <form className='form'>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='username'>Username</label>
                        <input type='username' className='form-control' id='username' placeholder='Enter username' />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='old_password'>Old Password</label>
                        <input type='password' className='form-control' id='old_password' placeholder='Enter old password' />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='new_password'>New Password</label>
                        <input type='password' className='form-control' id='new_password' placeholder='Enter new password' />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='confirm_password'>Confirm Password</label>
                        <input type='password' className='form-control' id='confirm_password' placeholder='Confirm new password' />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='salary_after_taxes'>Salary After Taxes</label>
                        <input type='number' className='form-control' id='salary_after_taxes' placeholder='Enter salary after taxes' />
                    </div>
                    <div className='submit'>
                        <button type='submit' className='btn btn-lg submit-btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Profile