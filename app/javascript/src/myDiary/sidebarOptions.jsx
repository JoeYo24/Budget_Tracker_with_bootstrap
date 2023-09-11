import React from 'react'

const SidebarOptions = ({ active, Icon, text, onClick }) => {
  return (
    <div className={`sidebarOptions ${active && 'sidebarOptions--active'}`}
      onClick={onClick}>
        <Icon />
        <p className='option-text'>{text}</p>
    </div>
  )
}

export default SidebarOptions;