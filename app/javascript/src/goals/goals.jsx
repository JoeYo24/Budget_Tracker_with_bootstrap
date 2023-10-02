import React, { useState, useEffect } from 'react';
import './goals.scss';
import Sidebar from '../myDiary/sidebar';
import '../myDiary/sidebar.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { safeCredentials, handleErrors, authenticityHeader, token } from '../utils/fetchHelper';

const Goals = () => {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState(null);
  const [savings, setSavings] = useState(null);
  const [goalProgress, setGoalProgress] = useState(goals.map(() => 0));


  useEffect(() => {
    if (!token) {
      console.log('User not authenticated');
      return;
    }
    
    fetchUserDetails();
    fetchGoals();
    fetchTransactionsBySavings();
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
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function fetchTransactionsBySavings() {
    try {
      const response = await fetch('/api/transactions', safeCredentials({
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
      console.log('Transactions Data:', data);
  
      const transactions = Object.values(data.transactions);
      console.log('Transactions:', transactions);
  
      const savingsTransactions = transactions.filter(transaction => transaction.transaction_type === 'Savings');
      console.log('Savings Transactions:', savingsTransactions);
  
      const savingsArray = savingsTransactions.map(transaction => parseFloat(transaction.amount));
      console.log('Savings Array:', savingsArray);
  
      const totalSavings = savingsArray.reduce((total, amount) => total + amount, 0);
      console.log('Total Savings:', totalSavings);
  
      setSavings(totalSavings);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function addGoal() {
    console.log('button clicked');
    window.location.href = '/goals/add';
  }

  console.log('Goals:', goals);
  console.log('Savings:', savings)

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
          {goals.map((goal, index) => (
            <div key={index} className='goalItem'>
              <p>{goal.description}</p>
              <p>{goal.target_date}</p>
              <p>{goal.amount}</p>
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
