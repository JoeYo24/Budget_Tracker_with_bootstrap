import React from 'react';
import '../login/login.scss';
import { safeCredentialsForm, authenticityHeader, handleErrors } from '../utils/fetchHelper.js'

const SignupWidget = () => {
    const handleClick = async (e) => {
        e.preventDefault();

        try {
            // First, create the user
            const createUserResponse = await fetch('/api/users', safeCredentialsForm({
                method: 'POST',
                body: JSON.stringify({
                    user: {
                        email: document.getElementById('email').value,
                        username: document.getElementById('username').value,
                        password: document.getElementById('password').value,
                        salary_after_tax: document.getElementById('salary_after_tax').value,
                    },
                }),
                headers: authenticityHeader({ 'Content-Type': 'application/json' }),
            }));

            const createUserData = await createUserResponse.json();

            if (createUserResponse.ok) {
                // User creation was successful, proceed to session creation
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
                console.log('Session creation response: ', createSessionData);

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
            } else {
                console.log('User creation failed:', createUserData.error);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

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
                '    <label className='form-label' htmlFor='username'>Username</label>
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
};

export default SignupWidget;