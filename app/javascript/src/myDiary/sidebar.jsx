import React from 'react'
import SidebarOptions from './sidebarOptions';
import './sidebar.scss'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DollarDiaryLogo from '../utils/images/DollarDiaryLogo.png'

const Sidebar = () => {
  function handleClick(pageUrl) {
    console.log('clicked');
    window.location.href = pageUrl;
  }

  return (
    <div className='sidebar'>
      <img className='img-responsive rounded logo' src={DollarDiaryLogo} alt="Dollar Diary Logo" width="100" height="100" />
      <SidebarOptions onClick={() => handleClick('/my-diary')} active={window.location.pathname === '/my-diary'} Icon={MenuBookIcon} text='My Diary' />
      <SidebarOptions onClick={() => handleClick('/profile')} active={window.location.pathname === '/profile'} Icon={AccountCircleIcon} text='Profile' />
      <SidebarOptions onClick={() => handleClick('/goals')} active={window.location.pathname === '/goals'} Icon={CheckCircleOutlineIcon} text='Goals' />
      <SidebarOptions onClick={() => handleClick('/compare')} active={window.location.pathname === '/compare'} Icon={CalendarMonthIcon} text='Compare' />
    </div>
  )
}

export default Sidebar;

