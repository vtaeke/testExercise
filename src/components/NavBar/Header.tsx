import React, { useState, useEffect } from 'react';

function Header(): JSX.Element {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header" style={{ display: 'flex', alignItems: 'center' }}>
      <img src="/img/logoTime.png" alt="Logo" style={{ width: '75px', height: '75px' }} />
      <div className="watch">{time}</div>
    </div>
  );
}

export default Header;
