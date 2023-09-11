import React, { useState } from 'react';
import './goals.scss';
import Sidebar from '../myDiary/sidebar';
import '../myDiary/sidebar.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Goals = () => {
  const initialGoals = [
    { title: 'Emergency Fund', progress: '50' },
    { title: 'Vacation', progress: '25' },
    { title: 'New Car', progress: '75' },
  ];

  const [goals, setGoals] = useState(initialGoals);

  function addGoal() {
    console.log('button clicked');
    window.location.href = '/goals/add';
  }

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
              <p>{goal.title}</p>
              <div className='progressBar'>
                <div className='progress' style={{ width: `${goal.progress}%`, backgroundColor: '#21772e' }}></div>
              </div>
              <p>{goal.progress}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;
