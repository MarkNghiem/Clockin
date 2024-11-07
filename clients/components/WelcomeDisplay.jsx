import React from 'react';

const WelcomeDisplay = ({ name }) => {
  return (
    <div id='welcomeDisplay'>
      <h1>Welcome, {name}!</h1>
    </div>
  )
}

export default WelcomeDisplay;