import React, { useState, useEffect } from 'react'
import './myDiary.scss'
import Sidebar from './sidebar'
import Footer from './footer'
import { VictoryPie } from 'victory'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { authenticityHeader, safeCredentials, token } from '../utils/fetchHelper'

const MyDiary = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [salary, setSalary] = useState(null);
  const [wants, setWants] = useState(null);
  const [savings, setSavings] = useState(null);
  const [needs, setNeeds] = useState(null);
  const [bankSavings, setBankSavings] = useState(null);
  let totalWants = 0;
  let totalSavings = 0;
  let totalNeeds = 0;

  useEffect(() => {
    // First, check if the user is authenticated
    if (!token) { 
      console.log('User not authenticated');
      return;
    }

    fetchUserDetails();
    fetchTransactions();
  }, []);

  const monthlySalary = (salary / 12).toFixed(2);
  const needsGoal = (salary * 0.5).toFixed(2);
  const wantsGoal = (salary * 0.3).toFixed(2);
  const minimumSavings = (salary * 0.2).toFixed(2);
  
  console.log('Needs Goal:', needsGoal);
  console.log('Wants Goal:', wantsGoal);
  console.log('Minimum Savings:', minimumSavings);
  

  function addTransaction() {
    console.log('button clicked');
    window.location.href = '/my-diary/transaction';
  }

  function handleDelete(transactionId) {
    console.log('delete button clicked');
  
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
  
    if (confirmDelete) {
      console.log('Delete confirmed');
  
      try { 
        fetch(`api/transactions/${transactionId}`, safeCredentials({
          method: 'DELETE', 
          headers: authenticityHeader({ 'Content-Type': 'application/json' }),
        }))
          .then(response => {
            if (!response.ok) {
              throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Response Data:', data);
            fetchTransactions(); // Fetch transactions after successful deletion
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }
      catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Delete cancelled');
    }
  }
  

  function fetchUserDetails() {
    fetch(`/api/sessions/authenticated/${token()}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...authenticityHeader(),
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Response Status:', response.status);
        if (!response.ok) {
          throw new Error('Failed to authenticate');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response Data:', data);

        if (data.authenticated) {
          setUser(data.username);
          setSalary(data.salary_after_tax);
          setBankSavings(data.bank_savings);
          console.log('User authenticated:', data.user);
        } else {
          console.log('User not authenticated.');
        }
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
      });
  }

  function fetchTransactions() {
    fetch('/api/transactions', safeCredentials({
      method: 'GET',
      credentials: 'include',
      headers: {
        ...authenticityHeader(),
        'Content-Type': 'application/json'
      }
    }))
      .then(response => {
        console.log('Transactions Response Status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('Transactions Response Data:', data);
  
        if (data.transactions) {
          setTransactions(data.transactions);
          console.log('Transactions fetched:', data.transactions);
 
          // Loop through transactions and calculate totals
          Object.values(data.transactions).forEach(transaction => {
            if (transaction.transaction_type === 'Need') {
              totalNeeds += parseFloat(transaction.amount);
            } else if (transaction.transaction_type === 'Want') {
              totalWants += parseFloat(transaction.amount);
            } else if (transaction.transaction_type === 'Savings') {
              totalSavings += parseFloat(transaction.amount);
            }
          });
  
          // Set the state for needs, wants, and savings
          setNeeds(totalNeeds);
          setWants(totalWants);
          setSavings(totalSavings);

          console.log('Needs:', totalNeeds);
          console.log('Wants:', totalWants);
          console.log('Savings:', totalSavings);
        }
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }  

  return (
    <div className="myDiary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='mainContent'>
        <div className='mainContent_header'>
          <h1>Welcome, {user}</h1>
        </div>
        <div className='mainContent_body'>
          <div className='mainContent_body_content'>
            <h2 className='text-center'>My Diary</h2>
            <div className='pieChart rounded'>
              <VictoryPie 
                className='img-responsive'
                data={[
                  { x: "Needs", y: needs },
                  { x: "Needs Goal", y: needsGoal - needs},
                  { x: "Wants", y: wants },
                  { x: "Wants Goal", y: wantsGoal - wants },
                  { x: "Savings", y: savings },
                  { x: "Savings Goal", y: minimumSavings - savings }
                ]}
                colorScale={["#398632", "#398657", "#1A4B04", "#2E4B1A", "#B0D78D", "B0B48D"]}
                style={{ labels: { fill: "#d5eed5", fontSize: 15, fontWeight: "bold", fontFamily: "Montserrat"}}}
              />
            </div>
            <div className='transactions rounded'>
              <div className='transactions_header d-flex text-center'>
                <h3 className='me-auto ms-auto'>Transactions</h3>
                <button onClick={addTransaction} className='btn addTransaction'>
                  <AddCircleIcon />
                </button>
              </div>
              <div className='transactions_body'>
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr>
                      <th scope='col'>Date</th>
                      <th scope='col'>Description</th>
                      <th scope='col'>Amount ($)</th>
                      <th scope='col'>Type</th>
                      <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody>
                  {transactions &&
                    Object.values(transactions)
                      .reverse() // Reverse the order so the most recent transactions are at the top
                      .slice(0, 15) // Only show the 15 most recent transactions
                      .map((transaction) => {
                        return (
                          <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>
                              <button
                                onClick={() => handleDelete(transaction.id)}
                                className='btn btn-danger deleteButton'
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                  })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='budget container rounded p-2'>
              <div className='budget_header d-flex text-center'>
                <h3 className='me-auto ms-auto'>Budget</h3>
              </div>
              <div className='budget_body'>
                <p className='text-center'>Your monthly salary is ${monthlySalary}</p>
                <p className='text-center'>The remaining spending you have for this month is ${((monthlySalary - (monthlySalary * .2)) - (needs + wants)).toFixed(2)}</p>
                <p className='text-center'>The minimum amount you have to save this year is ${minimumSavings}</p>
                <p className='text-center'>The amount you have saved in your bank so far is ${bankSavings}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MyDiary