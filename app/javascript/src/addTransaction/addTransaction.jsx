import React from 'react'
import './addTransaction.scss'
import Sidebar from '../myDiary/sidebar'

const AddTransaction = () => {
  return (
    <div>
      <div className='sidebarContainer'>
        <Sidebar />
      </div>
      <div className='addTransaction'>
        <h1>Add Transaction</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='Description'>Description</label>
            <input type='text' className='form-control' id='description' placeholder='Enter short description' />
          </div>
          <div className='form-group'>
            <label htmlFor='amount'>Amount</label>
            <input type='number' className='form-control' id='amount' placeholder='Enter amount' />
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
          <button type='submit' className='btn submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddTransaction