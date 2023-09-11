import React from 'react';
import './addGoal.scss';
import Sidebar from '../myDiary/sidebar';
import '../myDiary/sidebar.scss';

const AddGoal = () => {
  return (
    <div>
      <div className='sidebarContainer'>
        <Sidebar />
      </div>
      <div className='addGoal'>
        <h1 className='text-center'>Add Goal</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input type='text' className='form-control' id='description' placeholder='Enter a description' />
          </div>
          <div className='form-group'>
            <label htmlFor='amount'>Amount</label>
            <input type='number' className='form-control' id='amount' placeholder='Enter an amount' />
          </div>
          <div className='form-group'>
            <label htmlFor='targetDate'>Target Date</label>
            <input type='date' className='form-control' id='targetDate' placeholder='When do you want to complete it?' />
          </div>
          <button type='submit' className='btn submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddGoal;
