import React from 'react'
import './login.scss'
import { safeCredentialsForm, authenticityHeader, handleErrors } from '../utils/fetchHelper';

const LoginWidget = () => {
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Create a session after successful login
            const createSessionResponse = await fetch('/api/sessions', safeCredentialsForm({
                method: 'POST',
                body: JSON.stringify({
                    user: {
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value,
                    },
                }),
                headers: authenticityHeader({ 'Content-Type': 'application/json' }),
            }));

            const createSessionData = await createSessionResponse.json();

            if (createSessionResponse.ok) {
                if (createSessionData.token !== null) {
                    const token = createSessionData.token; 
                    localStorage.setItem('authToken', token);
                    // Session creation was successful, redirect to /my-diary
                    window.location.href = '/my-diary';
                } else {
                    console.log('Session creation failed: token is null ', createSessionData.error);
                }
            } else {
                console.log('Session creation failed:', createSessionData.error);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

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