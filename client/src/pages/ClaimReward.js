import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rewards = ({ userId }) => {
  const [dailyNextClaim, setDailyNextClaim] = useState(null);
  const [hour12NextClaim, set12HourNextClaim] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(43200); // 12 hours in seconds
  const [claimAmount, setClaimAmount] = useState(0);

  const claimDailyReward = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/rewards/claim-daily-reward', { userId });
      if (response.data.success) {
        alert(`You have received ${response.data.points} points!`);
        setDailyNextClaim(new Date(response.data.nextDailyClaim));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error claiming daily reward:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const claim12HourReward = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/rewards/claim-12hour-reward', { userId });
      if (response.data.success) {
        alert(`You have received ${response.data.points} points!`);
        set12HourNextClaim(new Date(response.data.next12HourClaim));
        setClaimAmount(response.data.points);
        setTimeLeft(43200); // Reset timer
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error claiming 12-hour reward:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateRemainingTime = (nextClaim) => {
    const now = new Date();
    const diff = nextClaim - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (hour12NextClaim) {
        const diff = Math.floor((hour12NextClaim - new Date()) / 1000);
        setTimeLeft(diff > 0 ? diff : 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hour12NextClaim]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
      <div className="flex flex-col items-center h-fit w-full mb-5 mt-4 mx-5">
        <div className="w-full rounded-2xl h-fit relative mt-1 border-2 border-slate-900">
          <div
            className="relative h-9 rounded-xl bg-gradient-to-r from-gray-300 via-pink-400 to-blue-900"
            style={{ width: `${(timeLeft / 43200) * 100}%` }}
          ></div>
          <span className="absolute inset-0 flex justify-center items-center text-white font-bold">
            {timeLeft === 43200 ? `Your Reward: ${claimAmount}` : formatTime(timeLeft)}
          </span>
        </div>
     

      <div className="relative w-full flex flex-row justify-between">
        <button
          className="text-white font-bold py-2 px-4 rounded-full mt-4 border-solid border-white bg-yellow-500 hover:bg-transparent border-s-2"
          onClick={claimDailyReward} disabled={(dailyNextClaim && dailyNextClaim > new Date()) || isLoading}>
          Daily Reward {dailyNextClaim && dailyNextClaim > new Date() && `in ${calculateRemainingTime(dailyNextClaim)}`}
        </button>
        <button
          className="text-white font-bold py-2 px-4 rounded-full mt-4 border-solid border-white bg-yellow-500 hover:bg-transparent border-s-2"
          onClick={claim12HourReward} disabled={(hour12NextClaim && hour12NextClaim > new Date()) || isLoading}>
          Mine {hour12NextClaim && hour12NextClaim > new Date() && `in ${calculateRemainingTime(hour12NextClaim)}`}
        </button>
      </div>
    </div >
  );
};

export default Rewards;
