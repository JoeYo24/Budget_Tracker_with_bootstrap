import React, { useState, useEffect } from 'react'
import './compare.scss'
import Sidebar from '../myDiary/sidebar'
import '../myDiary/sidebar.scss'
import 'react-dates/initialize';
import { SingleDatePickerWrapper, SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const Compare = () => {
    const [date, setDate] = useState(null)
    const [focused, setFocused] = useState(false)

  return (
    <div className='compare'>
        <div className='sidebarContainer'>
            <Sidebar />
        </div>
        <div className='compareContainer rounded'>
            <h1 className='text-center headerText'>Compare</h1>
            <div className='row'>
                <div className='dateRange col-12 col-lg-6'>
                    <h3>Select a Date</h3>
                    <SingleDatePicker
                        date={date}
                        onDateChange={date => setDate(date)}
                        focused={focused}
                        onFocusChange={({ focused }) => setFocused(focused)}
                        id="date"
                        placeholder="Date"
                        numberOfMonths={1}
                    />
                    <button className='btn btn-primary'>Compare</button>
                    <div className='transactionList rounded'> 
                        <h3>Transactions</h3>
                        <div className='transaction'>
                            <p>Transaction 1</p>
                            <p>$1,234</p>
                        </div>
                        <div className='transaction'>
                            <p>Transaction 2</p>
                            <p>$1,234</p>
                        </div>
                    </div>
                </div>

                <div className='monthlyComparison col-12 col-lg-6'>
                    <h3>Monthly Comparison</h3>
                    <p>Your savings last month was $1,456</p>
                    <p>Your savings this month is $1,234</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Compare