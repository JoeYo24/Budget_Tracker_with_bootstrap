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
          // Make the GET request with the formatted date
          fetch(`/api/transactions/${selectedDate}`, safeCredentials({
            method: 'GET',
            credentials: 'include',
            headers: {
              ...authenticityHeader(),
              'Content-Type': 'application/json',
            },
          }))
            .then(handleErrors)
            .then((response) => {
                if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status})`);
                }
                return response.text(); // Read the response as text
            })
            .then((data) => {
                console.log('API Response:', data); // Log the response as text
                // Handle the retrieved transactions
                try {
                const jsonData = JSON.parse(data); // Attempt to parse the response as JSON
                console.log('Transactions:', jsonData.transactions);
                } catch (error) {
                console.error('JSON Parsing Error:', error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        }
    };

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