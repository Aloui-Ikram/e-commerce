import React from 'react';
import './topbar.css';

const Topbar = () => {
  return (
    <div className='topbar'>
      <div className='topbaWrapper'>
        <div className='topleft'>
          <img
            src="https://i.ibb.co/qJgdY0G/stripe-modified.png"
            style={{ width: '100px', height: '90px' }}
            alt="Logo"
          />
        </div>

        <div className='topmiddle'> 
          <h3 className='topbarTitle'>Dashboard </h3> 
        </div>

        <div className='topright'>
          <img
            src="https://www.lansweeper.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN.png"
            alt="Avatar"
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}

export default Topbar;