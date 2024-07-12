import React, { useState, useEffect } from 'react';

const Countdown = ({ onPointClaim, minClaim, maxClaim }) => {
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [isCounting, setIsCounting] = useState(false);
  const [claimAmount, setClaimAmount] = useState(null);

  useEffect(() => {
    console.log('useEffect called');
    console.log('isCounting:', isCounting);
    console.log('timeLeft:', timeLeft);

    let timer;
    if (isCounting && timeLeft < 100) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timeLeft === 100) {
      setIsCounting(false);
      const randomClaim = Math.floor(Math.random() * (maxClaim - minClaim + 1)) + minClaim;
      setClaimAmount(randomClaim);
    }
    return () => clearInterval(timer);
  }, [isCounting, timeLeft, minClaim, maxClaim]);

  const startCountdown = () => {
    console.log('Button clicked');
    if (timeLeft === 100) {
      onPointClaim(claimAmount);
      setTimeLeft(0);
      setClaimAmount(null);
    }
    setIsCounting(true);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center w-full m-5">
      <div className="w-full bg-gray-200 rounded-full h-8 mb-12 relative">
        <div
          className="bg-blue-600 h-8 rounded-full"
          style={{ width: `${(timeLeft / 100) * 100}%` }}
        ></div>
        <span className="absolute inset-0 rounded-full flex justify-center items-center text-white font-bold">
          {timeLeft === 100 ? `Claimable Amount: ${claimAmount}` : formatTime(timeLeft)}
        </span>
      </div>

      <div className='relative w-full flex flex-row justify-between '>
        <button
          onClick={startCountdown}
          className={`${timeLeft === 100 ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded mt-4`}
        >
          {timeLeft === 100 ? 'Claim Point' : 'Mine'}
        </button>
        <button

          className=
          'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'
        >
          Daily Reward
        </button>

      </div>

    </div>
  );
};

export default Countdown;
