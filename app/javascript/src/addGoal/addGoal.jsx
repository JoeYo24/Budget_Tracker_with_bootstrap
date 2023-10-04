import React, { useState } from 'react';
import './addGoal.scss';
import Sidebar from '../myDiary/sidebar';
import '../myDiary/sidebar.scss';
import { safeCredentialsForm, authenticityHeader, handleErrors } from '../utils/fetchHelper';

const AddGoal = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submit clicked');

    const goal = {
      description: document.getElementById('description').value, 
      amount: document.getElementById('amount').value,
    }

    fetch('/api/goals', safeCredentialsForm({
      method: 'POST',
      body: JSON.stringify(goal),
      headers: {
        ...authenticityHeader(),
        'Content-Type': 'application/json'
      }
    }))
    .then(response => {
      console.log('Response Status:', response.status);
      console.log('Response OK:', response.ok);
    
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    })
    .then(data => {
      console.log('Response Data: ', data);
    
      // Handle success
      document.getElementById('description').value = '';
      document.getElementById('amount').value = '';

      setSuccessMessage('Goal successfully added!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 10000);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
    

  return (
    <div>
      <div className='sidebarContainer'>
        <Sidebar />
      </div>
      <div className='addGoal'>
        <h1 className='text-center'>Add Goal</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input type='text' className='form-control' id='description' placeholder='Enter a description' />
          </div>
          <div className='form-group'>
            <label htmlFor='amount'>Amount</label>
            <input type='number' className='form-control' id='amount' placeholder='Enter an amount' />
          </div>
          <button type='submit' className='btn submit'>Submit</button>
        </form>
        {successMessage && <div className='text-success'>{successMessage}</div>}
      </div>
    </div>
  );
};

export default AddGoal;
