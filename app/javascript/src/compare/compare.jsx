import React, { useState, useEffect } from 'react'
import './compare.scss'
import Sidebar from '../myDiary/sidebar'
import '../myDiary/sidebar.scss'
import 'react-dates/initialize';
import { SingleDatePickerWrapper, SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { safeCredentials, handleErrors, authenticityHeader, token } from '../utils/fetchHelper';

const Compare = () => {
    const [date, setDate] = useState(null)
    const [focused, setFocused] = useState(false)

    const handleCompareClick = async () => {
        console.log('handle compare click');
        console.log(date);
    
        const selectedDate = date ? date.toISOString().split('T')[0] : null; // Format as 'YYYY-MM-DD' or null if no date selected
    
        if (selectedDate) {
            try {
                const response = await fetch(`/api/transactions/${selectedDate}`, safeCredentials({
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        ...authenticityHeader(),
                        'Content-Type': 'application/json',
                    },
                }));
    
                if (!response.ok) {
                    throw new Error(`Network response error (${response.status}): ${response.statusText}`);
                }
    
                const data = await response.text();
                console.log('API Response:', data);
    
                try {
                    const jsonData = JSON.parse(data);
                    console.log('Transactions:', jsonData.transactions)
                    const transactions = jsonData.transactions;
                } catch (error) {
                    console.error('JSON Parsing Error:', error);
                }
            } catch (error) {
                console.error('An unexpected error occurred:', error.message);
            }
        }
    }
    
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
                    <button onClick={handleCompareClick} className='btn btn-primary'>Compare</button>
                    <div className='transactionList rounded'> 
                        <h3>Transactions</h3>
                        {transactions.map(transaction => {
                            return (
                                <div key={transaction.id} className='transaction'>
                                    <p>{transaction.description}</p>
                                    <p>{transaction.amount}</p>
                                </div>
                            )
                        })}
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