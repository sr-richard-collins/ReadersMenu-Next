import React from 'react';
import '../assets/css/mystyle.css'; // Import your CSS file for styling
import { IMAGE_BASE_URL } from '@/config';

const Loader = () => (
  <div className='loader-container'>
    <img src='/assets/loading.gif' alt='Loading...' className='loader-image' />
  </div>
);

export default Loader;
