import React from 'react';
import '../assets/css/mystyle.css'; // Import your CSS file for styling
import { IMAGE_BASE_URL } from '@/config';

const Loader = () => (
  <div className='loader-container'>
    <video autoPlay loop muted className='loader-video'>
      <source src={IMAGE_BASE_URL + 'loader.mp4'} type='video/mp4' />
    </video>
  </div>
);

export default Loader;
