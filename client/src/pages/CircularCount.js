// CountdownTimer.js

import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CountdownTimer = ({ duration, onClaim }) => {
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [countdownComplete, setCountdownComplete] = useState(false);

  const handleStartCountdown = () => {
    setCountdownStarted(true);
  };

  const handleCountdownComplete = () => {
    setCountdownComplete(true);
  };

  const handleClaim = () => {
    if (countdownComplete) {
      // Generate a random number (your claim logic)
      const randomPoints = Math.floor(Math.random() * 41) + 10;
      onClaim(randomPoints); // Pass the points to the parent component
      setCountdownComplete(false);
      setCountdownStarted(false); // Reset countdown
    }
  };

  return (
    <div>
      {!countdownStarted ? (
        <button className="text-red-600"
        onClick={handleStartCountdown}>Start Countdown</button>
      ) : (
        <div>
          <CountdownCircleTimer
            isPlaying={!countdownComplete}
            duration={duration}
            onComplete={handleCountdownComplete}
            colors={["#A30000"]}
          >
            {({ remainingTime }) => (
              <div>
                <p className="bg-purple-900">Time left: {Math.ceil(remainingTime)} seconds</p>
                <button className="bg-green-500" onClick={handleClaim} disabled={!countdownComplete}>
                  Claim Points
                </button>
              </div>
            )}
          </CountdownCircleTimer>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
