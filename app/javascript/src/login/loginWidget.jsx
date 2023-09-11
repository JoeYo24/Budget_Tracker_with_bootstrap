import React from 'react'
import './login.scss'

const LoginWidget = () => {

    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = '/my-diary'
    }

  return (
    <div className='loginWidget'>
        <div className='container rounded'>
            <h1 className='text-center'>Login</h1>
            <form className='form'>
                <div className='form-group'>
                    <label className='form-label' htmlFor='username'>Username</label>
                    <input type='username' className='form-control' id='username' placeholder='Enter username' />
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