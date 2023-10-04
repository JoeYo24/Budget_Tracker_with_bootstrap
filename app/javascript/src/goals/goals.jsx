import React, { useState, useEffect } from 'react';
import './goals.scss';
import Sidebar from '../myDiary/sidebar';
import '../myDiary/sidebar.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { safeCredentials, handleErrors, authenticityHeader, token } from '../utils/fetchHelper';

const Goals = () => {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);


  useEffect(() => {
    if (!token) {
      console.log('User not authenticated');
      return;
    }
    
    fetchUserDetails();
    fetchGoals();
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

  function addGoal() {
    console.log('button clicked');
    window.location.href = '/goals/add';
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
          {goals.map((goal, index) => (
            <div key={index} className='goalItem'>
              <p>{goal.description}</p>
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
