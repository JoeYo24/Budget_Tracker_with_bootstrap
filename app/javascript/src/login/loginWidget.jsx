import React from 'react'
import './login.scss'
import { safeCredentialsForm, authenticityHeader, handleErrors } from '../utils/fetchHelper';

const LoginWidget = () => {

    const handleClick = (e) => {
        e.preventDefault();
        fetch('/api/sessions', safeCredentialsForm({
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email: document.getElementById('email').value, 
                    password: document.getElementById('password').value
                }
            }),
            headers: authenticityHeader({'Content-Type': 'application/json'})
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                window.location.href = '/my-diary';
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

  return (
    <div className='loginWidget'>
        <div className='container rounded'>
            <h1 className='text-center'>Login</h1>
            <form className='form'>
                <div className='form-group'>
                    <label className='form-label' htmlFor='username'>Email</label>
                    <input type='email' className='form-control' id='email' placeholder='Enter email' />
                </div>
                <div className='form-group'>
                    <label className='form-label' htmlFor='password'>Password</label>
                    <input type='password' className='form-control' id='password' placeholder='Enter password' />
                </div>
                <div className='submit'>
                    <button onClick={handleClick} type='submit' className='btn btn-lg submit-btn'>Submit</button>
                </div>
            </form>
            <div className='text-center bottom-text'>
                <p>Don't have an account yet? <a href='/signup'>Sign Up</a></p>
            </div>
        </div>
    </div>
  )
}

export default LoginWidget;