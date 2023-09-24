import React from 'react'
import SidebarOptions from './sidebarOptions';
import './sidebar.scss'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import DollarDiaryLogo from '../utils/images/DollarDiaryLogo.png'
import { safeCredentialsForm, authenticityHeader, handleErrors, safeCredentials } from '../utils/fetchHelper';

const Sidebar = () => {
  function handleClick(pageUrl) {
    console.log('clicked');
    window.location.href = pageUrl;
  }

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
  
    if (confirmLogout) {
      console.log('Logout confirmed');
  
      try {
        // Get the token from the meta tag
        const token = localStorage.getItem('authToken');

        if (!token) {
          console.log('Token not found in storage');
          return;
        }
        
        // Send a DELETE request to log the user out on the server
        const response = await fetch(`/api/sessions/${token}`, { // Include the token in the URL
          method: 'DELETE',
          headers: authenticityHeader({ 'Content-Type': 'application/json' }),
        });
  
        if (response.ok) {
          // Redirect the user to the login page
          window.location.href = '/login';
        } else {
          console.log('Logout failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Logout cancelled');
    }
  };   
  
  return (
    <div className='sidebar'>
      <img className='img-responsive rounded logo' src={DollarDiaryLogo} alt="Dollar Diary Logo" width="100" height="100" />
      <SidebarOptions onClick={() => handleClick('/my-diary')} active={window.location.pathname === '/my-diary'} Icon={MenuBookIcon} text='My Diary' />
      <SidebarOptions onClick={() => handleClick('/profile')} active={window.location.pathname === '/profile'} Icon={AccountCircleIcon} text='Profile' />
      <SidebarOptions onClick={() => handleClick('/goals')} active={window.location.pathname === '/goals'} Icon={CheckCircleOutlineIcon} text='Goals' />
      <SidebarOptions onClick={() => handleClick('/compare')} active={window.location.pathname === '/compare'} Icon={CalendarMonthIcon} text='Compare' />
      <SidebarOptions onClick={handleLogout} Icon={LogoutIcon} text='Logout' />
    </div>
  )
}

export default Sidebar;

