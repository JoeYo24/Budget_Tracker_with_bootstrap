import React from 'react'
import './myDiary.scss'
import Sidebar from './sidebar'
import Footer from './footer'
import { VictoryPie } from 'victory'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const MyDiary = () => {
  const salary = 75000
  const monthlySalary = salary / 12
  const biWeeklyPay = monthlySalary / 2
  const needs = 480
  const wants = 15
  const savings = monthlySalary - (needs + wants)
  const totalNeeds = monthlySalary * .5
  const totalWants = monthlySalary * .3
  const minimumSavings = monthlySalary * .2

  function addTransaction() {
    console.log('button clicked');
    window.location.href = '/my-diary/transaction'
  }

  return (
    <div className="myDiary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='mainContent'>
        <div className='mainContent_header'>
          <h1>Welcome, User</h1>
        </div>
        <div className='mainContent_body'>
          <div className='mainContent_body_content'>
            <h2 className='text-center'>My Diary</h2>
            <div className='pieChart rounded'>
              <VictoryPie 
                className='img-responsive'
                data={[
                  { x: "Needs", y: needs },
                  { x: "Wants", y: wants },
                  { x: "Savings", y: savings }
                ]}
                colorScale={["#398632", "#1A4B04", "#B0D78D"]}
                style={{ labels: { fill: "#d5eed5", fontSize: 20, fontWeight: "bold", fontFamily: "Montserrat"}}}
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
                      <th scope='col'>Amount</th>
                      <th scope='col'>Type</th>
                      <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope='row'>1/1/2021</th>
                      <td>Paycheck</td>
                      <td>${biWeeklyPay}</td>
                      <td>Income</td>
                      <td>
                        <button className='btn btn-danger deleteButton'>Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>1/2/2021</th>
                      <td>Gas</td>
                      <td>$30</td>
                      <td>Need</td>
                      <td>
                        <button className='btn btn-danger deleteButton'>Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>1/3/2021</th>
                      <td>Food</td>
                      <td>$450</td>
                      <td>Need</td>
                      <td>
                        <button className='btn btn-danger deleteButton'>Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>1/4/2021</th>
                      <td>Netflix</td>
                      <td>$15</td>
                      <td>Want</td>
                      <td>
                        <button className='btn btn-danger deleteButton'>Delete</button>
                      </td>
                    </tr>
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
                <p className='text-center'>The remaining spending you have is ${(totalWants + totalNeeds) - (needs + wants)}</p>
                <p className='text-center'>The minimum amount you have to save is ${minimumSavings}</p>
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