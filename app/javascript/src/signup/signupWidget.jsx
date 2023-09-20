import React from 'react';
import '../login/login.scss';
import { safeCredentialsForm, authenticityHeader, handleErrors } from '../utils/fetchHelper.js'

const SignupWidget = () => {

    const handleClick = (e) => {
        e.preventDefault();
        fetch('/api/users', safeCredentialsForm ({
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email: document.getElementById('email').value, 
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value,
                    salary_after_tax: document.getElementById('salary_after_tax').value
                }
            }),
            headers: authenticityHeader({'Content-Type': 'application/json'})

        }))
        .then(handleErrors)
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })

        fetch('/api/sessions', safeCredentialsForm({
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                    username: document.getElementById('username').value
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
    <div className='signupWidget'>
        <div className='container rounded'>
            <h1 className='text-center'>Sign Up</h1>
            <form className='form'>
                <div className='form-group'>
                    <label className='form-label' htmlFor='email'>Email</label>
                    <input type='email' className='form-control' id='email' placeholder='Enter email' />
                </div>
                <div className='form-group'>
                    <label className='form-label' htmlFor='username'>Username</label>
                    <input type='text' className='form-control' id='username' placeholder='Enter username' />
                </div>
                <div className='form-group'>
                    <label className='form-label' htmlFor='password'>Password</label>
                    <input type='password' className='form-control' id='password' placeholder='Enter password' /> 
                </div>
                <div className='form-group'>
                    <label className='form-label' htmlFor='salary_after_tax'>Salary After Tax</label>
                    <input type='number' className='form-control' id='salary_after_tax' placeholder='Enter salary after tax' />
                </div>
                <div className='submit'>
                    <button onClick={handleClick} type='submit' className='btn btn-lg btn-block submit-btn'>Submit</button>
                </div>
            </form>
            <div className='text-center bottom-text'>
                <p>Already have an account? <a href='/login'>Login</a></p>
            </div>
        </div>
    </div>
  )
}

export default SignupWidget;