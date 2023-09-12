import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './home.scss'
import DollarDiaryLogo from './utils/images/DollarDiaryLogo.png'
import Dropdown from 'react-bootstrap/Dropdown'
import { VictoryPie } from 'victory';
import DollarDiaryScreenshot from './utils/images/BudgetTrackerScreen.png'

function MyDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Get Started
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/login">Login</Dropdown.Item>
        <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const Home = () => {

    return (
        <div className='home'>
            <nav className="navbar navbar-expand-xl me-auto ms-auto w-100">
                {/* Navbar */}
                <div className="navbar-brand ps-3">
                    <a className="navbar-item" href="/">
                        <img src={DollarDiaryLogo} alt="Dollar Diary Logo" width="70" height="70" />
                    </a>
                </div>
                <div className='navbar-start'>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className='navbar-end'>
                    <MyDropdown />
                </div>
            </nav>
            <main className='main'>
                {/* Main */}
                <div className='row'>
                    <div className='col-12 col-md-6 main-text'>
                        <h1 className='text-center align-items-center'>Welcome to Dollar Diary</h1>
                        <p className='text-center align-items-center'>A budgeting app for the everyday person.</p>
                        <p className='text-center align-items-center'>Sign up today to start tracking your expenses!</p>
                    </div>
                    <div className='col-12 col-md-6 main-image'>
                        <img className='img-responsive headerImage' src={DollarDiaryScreenshot} alt='placeholder' /> 
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <div className='pieContainer'>
                            <VictoryPie
                                data={[
                                    { x: "Needs", y: 50 },
                                    { x: "Wants", y: 30 },
                                    { x: "Savings", y: 20 }
                                ]}
                                colorScale={["#398632", "#1A4B04", "#B0D78D"]}
                                style={{ width: "100%", height: "100%", labels: { fontSize: '9px', fontFamily: 'Montserrat, sans-serif' } }} // Adjust the style here
                            />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 main-text'>
                        <div className='text-center align-items-center'>
                            <h1>Our Approach</h1>
                            <p>Dollar Diary follows the proven 50-30-20 budgeting rule, dividing your income into three key categories:</p>
                            <ul>
                                <li><strong>50% for Needs:</strong> Covering essential expenses like rent, utilities, and groceries.</li>
                                <li><strong>30% for Wants:</strong> Providing flexibility for discretionary spending on things you desire.</li>
                                <li><strong>20% for Savings:</strong> Ensuring you build a secure financial future.</li>
                            </ul>
                            <p>Start your financial journey today by signing up and easily tracking your expenses!</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer className='footer'>
                {/* Footer */}
                <div className='row'>
                    <div className='col-4'>
                        <ul className='list-unstyled'>
                            <li><a className='footer-text' href='#'>Contact Us</a></li>
                            <li><a className='footer-text' href='#'>About Us</a></li>
                            <li><a className='footer-text' href='#'>FAQ</a></li>
                        </ul>
                    </div>
                    <div className='col-4'>
                        <ul className='list-unstyled'>
                            <li><a className='footer-text' href='#'>Privacy Policy</a></li>
                            <li><a className='footer-text' href='#'>Terms</a></li>
                            <li><a className='footer-text' href='#'>Cookies</a></li>
                        </ul>
                    </div>
                    <div className='col-4'>
                        <ul className='list-unstyled'>
                            <li><a className='footer-text' href='#'>Facebook</a></li>
                            <li><a className='footer-text' href='#'>Instagram</a></li>
                            <li><a className='footer-text' href='#'>Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};


document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.createElement('div');
  document.body.appendChild(rootElement);

  const root = createRoot(rootElement);
  root.render(<Home />);
});
