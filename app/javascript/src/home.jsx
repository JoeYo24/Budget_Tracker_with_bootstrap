import React from 'react';
import { createRoot } from 'react-dom/client';
import './home.scss'

const Home = () => {
  return (
    <div className='container'>
      <h1 className='text-success'>Hello World!</h1>
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.createElement('div');
  document.body.appendChild(rootElement);

  const root = createRoot(rootElement);
  root.render(<Home />);
});
