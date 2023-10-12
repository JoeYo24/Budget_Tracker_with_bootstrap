import React, { useState, useEffect } from 'react';
import './goals.scss';
import Sidebar from '../myDiary/sidebar';
import '../myDiary/sidebar.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { safeCredentials, handleErrors, authenticityHeader, token } from '../utils/fetchHelper';

const Goals = () => {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [savingsTransactions, setSavingsTransactions] = useState([]);

  useEffect(() => {
    if (!token) {
      console.log('User not authenticated');
      return;
    }
    
    fetchUserDetails();
    fetchGoals();
    fetchSavingsTransactions();
  }, []);
  
  async function fetchUserDetails() {
    try {
      const response = await fetch(`/api/sessions/authenticated/${token()}`, safeCredentials({
        method: 'GET',
        headers: {
          ...authenticityHeader(),
          'Content-Type': 'application/json',
        },
      }));
  
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
  
      const res = await response.json();
      setUser(res.user);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function fetchGoals() {
    try {
      const response = await fetch(`/api/goals`, safeCredentials({
        method: 'GET',
        credentials: 'include',
        headers: {
          ...authenticityHeader(),
          'Content-Type': 'application/json',
        },
      }));
  
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
  
      const data = await response.json();
      const goalsArray = Object.values(data.goals);
      setGoals(goalsArray);

      const goalsIds = goalsArray.map(goal => goal.id);
      console.log('Goals IDs:', goalsIds);

      updateGoals(goalsIds);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function fetchSavingsTransactions() {
    try {
      const response = await fetch(`/api/savings_transactions`, safeCredentials({
        method: 'GET',
        credentials: 'include',
        headers: {
          ...authenticityHeader(),
          'Content-Type': 'application/json',
        },
      }));
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(`Network response was not ok (${response.status}): ${errorData.error || 'Unknown error'}`);
      }
  
      const data = await response.json();
      const savingsTransactionsArray = Object.values(data.savings_transactions);
      setSavingsTransactions(savingsTransactionsArray);
      console.log('Savings Transactions:', savingsTransactionsArray);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  function addGoal() {
    console.log('button clicked');
    window.location.href = '/goals/add';
  }

  function formatTargetDate(targetDate) {
    const date = new Date(targetDate);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}-${year}`;
  }

  console.log('Goals:', goals);

  return (
    <div className='goals'>
      <div className='sidebarContainer'>
        <Sidebar />
      </div>
      <div className='rounded goalsContainer'>
        <div className='goalsHeader'>
          <h1 className='headerText'>Goals</h1>
          <button className='btn addGoalButton' onClick={addGoal}>  
              <AddCircleIcon />
          </button>
        </div>
        <div className='goal-list'>
          {goals.length === 0 && (
            <div>
              <p>You don't have any goals yet. Create a new goal to get started.</p>
            </div>
          )}

          {goals.every(goal => goal.progress >= 100) && (
            <div>
              <p>If you already had goals. Congratulations! You've completed all your goals.</p>
            </div>
          )}

          {goals.map((goal, index) => (
            <div key={index} className='goalItem'>
              <p>{goal.description}</p>
              <p>Total Amount: {goal.amount}</p>
              <p>Estimated Completion Date: {formatTargetDate(goal.target_date)}</p>
              <div className='progressBar'>
                <div className='progress' style={{ width: `${goal.progress}%` }}>
                  {goal.progress}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;

