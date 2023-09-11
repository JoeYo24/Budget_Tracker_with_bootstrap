import React from 'react';
import '../login/login.scss';

const SignupWidget = () => {

    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = '/my-diary'
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
                    <input type='username' className='form-control' id='username' placeholder='Enter username' />
                </div>
                <div className='form-group'>
                    <label className='form-label' htmlFor='password'>Password</label>
                    <input type='password' className='form-control' id='password' placeholder='Enter password' /> 
                </div>
                <div className='form-group'>
                    <label className='form-label' htmlFor='salary_after_tax'>Salary After Tax</label>
                    <input type='salary_after_tax' className='form-control' id='salary_after_tax' placeholder='Enter salary after tax' />
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