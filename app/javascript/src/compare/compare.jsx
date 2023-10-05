import React, { useState, useEffect } from 'react';
import './compare.scss';
import Sidebar from '../myDiary/sidebar';
import '../myDiary/sidebar.scss';
import 'react-dates/initialize';
import { SingleDatePickerWrapper, SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { safeCredentials, handleErrors, authenticityHeader, token } from '../utils/fetchHelper';

const Compare = () => {
    const [date, setDate] = useState(null);
    const [focused, setFocused] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [monthlyComparison, setMonthlyComparison] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/monthly_comparisons', safeCredentials({
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

                const data = await response.json(); 
                console.log('Response Data: ', data); 
                setMonthlyComparison(data.monthly_comparisons);
            } catch (error) {
                console.error('An unexpected error occurred: ', error.message);
            }
        }

        fetchData(); 
    }, [])

    const handleCompareClick = async () => {
        console.log('handle compare click');
        console.log(date);

        const selectedDate = date ? date.toISOString().split('T')[0] : null;

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
                    console.log('Transactions:', jsonData.transactions);

                    // Set the transactions state with the retrieved data
                    setTransactions(jsonData.transactions);
                } catch (error) {
                    console.error('JSON Parsing Error:', error);
                }
            } catch (error) {
                console.error('An unexpected error occurred:', error.message);
            }
        }
    }

    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1) % 12;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    console.log('Current Date: ', currentDate);

    // Get the current month and last month as strings in the format "YYYY-MM-01"
    const currentMonthStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-01`;
    const lastMonthStr = `${currentDate.getFullYear()}-${(currentMonth - 1).toString().padStart(2, '0')}-01`;

    const thisMonthComparison = monthlyComparison.find(comparison => 
        comparison.month === currentMonthStr
    );

    const lastMonthComparison = monthlyComparison.find(comparison => 
        comparison.month === lastMonthStr
    );


    console.log('Monthly Comparison: ', monthlyComparison);
    console.log('This Month Comparison: ', thisMonthComparison);
    console.log('Last Month Comparison: ', lastMonthComparison);
    console.log('Current Month: ', currentMonth);
    console.log('Last Month: ', lastMonth);

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
                            isOutsideRange={() => false}
                        />
                        <button onClick={handleCompareClick} className='btn btn-primary'>Compare</button>
                        <div className='transactionList rounded'>
                            <h3>Transactions</h3>
                            {transactions.map(transaction => (
                                <div key={transaction.id} className='transaction'>
                                    <p>{transaction.description}</p>
                                    <p>${transaction.amount}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='monthlyComparison col-12 col-lg-6'>
                        <h3>Monthly Comparison</h3>
                        <p>Your savings last month was ${lastMonthComparison ? lastMonthComparison.savings : 0}</p>
                        <p>Your savings this month is ${thisMonthComparison ? thisMonthComparison.savings : 0}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Compare;
