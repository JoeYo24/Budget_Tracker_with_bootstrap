import React, { useState, useEffect } from 'react';
import './addTransaction.scss';
import Sidebar from '../myDiary/sidebar';
import { safeCredentialsForm, authenticityHeader, handleErrors, safeCredentials } from '../utils/fetchHelper';

const AddTransaction = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    fetch('/api/goals', safeCredentials({
      method: 'GET',
      credentials: 'include',
      headers: {
        ...authenticityHeader(),
        'Content-Type': 'application/json',
      }
    }))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Goals Data:', data);
        setGoals(data.goals);
      })
      .catch((error) => {
        console.error('Error fetching goals:', error);
      });            
  }, []);

  const handleGoalChange = (e) => {
    setSelectedGoal(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log('Submit clicked');

    const transaction = {
      description: document.getElementById('description').value,
      amount: document.getElementById('amount').value,
      date: document.getElementById('date').value,
      transaction_type: document.getElementById('type').value,
      goal_id: selectedGoal, // Include the selected goal ID in the transaction data
    };

    console.log(transaction);

    fetch('/api/transactions', safeCredentialsForm({
      method: 'POST',
      body: JSON.stringify(transaction),
      headers: {
        ...authenticityHeader(),
        'Content-Type': 'application/json',
      },
    }))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response Data:', data);

        // Clear form fields after successful submission
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('date').value = '';
        document.getElementById('type').value = 'Income';
        document.getElementById('goal').value = '';

        // Display success message to the user
        setSuccessMessage('Transaction successfully added!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 10000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div className='sidebarContainer'>
        <Sidebar />
      </div>
      <div className='addTransaction'>
        <h1>Add Transaction</h1>
        <form onSubmit={handleClick}>
          <div className='form-group'>
            <label htmlFor='Description'>Description</label>
            <input type='text' className='form-control' id='description' placeholder='Enter short description' />
          </div>
          <div className='form-group'>
            <label htmlFor='amount'>Amount</label>
            <input type='number' step=".01" className='form-control' id='amount' placeholder='Enter amount' />
          </div>
          <div className='form-group'>
            <label htmlFor='date'>Date</label>
            <input type='date' className='form-control' id='date' placeholder='Enter date' />
          </div>
          <div className='form-group'>
            <label htmlFor='type'>Type</label>
            <select className='form-control' id='type'>
              <option>Income</option>
              <option>Need</option>
              <option>Want</option>
              <option>Savings</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='goal'>Goal (Optional)</label>
            <select className='form-control' id='goal' onChange={handleGoalChange}>
              <option value="">None</option>
              {goals && Object.values(goals).length > 0 ? (
                Object.values(goals).map((goal) => (
                  <option key={goal.id} value={goal.id}>
                    {goal.description} - {goal.amount}
                  </option>
                ))
              ) : (
                <option value="">No goals found</option>
              )}
            </select>
          </div>
          <button type='submit' className='btn submit'>Submit</button>
        </form>
        {successMessage && <div className='success-message'>{successMessage}</div>}
      </div>
    </div>
  );
};

export default AddTransaction;
