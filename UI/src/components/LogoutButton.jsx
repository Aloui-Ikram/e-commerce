import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userRedux'; // Replace 'yourReduxSlice' with the appropriate path to your Redux slice
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action to reset the state
    dispatch(logout());

    // Clear local storage
    localStorage.clear();

    // Redirect to the login page or any other desired route
    // window.location.href = '/login'; // Uncomment this line if you want to perform a full page reload
  };

  return (
   <Link to="/"> <LogoutRoundedIcon  style={{color:"#3C2A21"}}  onClick={handleLogout}/></Link>
    
  );
};

export default LogoutButton;
