import { useState, useEffect } from 'react';

const useAuth = () => {
  // State to store whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on component mount
    const userToken = sessionStorage.getItem('user_token');
    setIsLoggedIn(userToken !== null && userToken !== '');
  }, []);

  return isLoggedIn;
};

export default useAuth;
