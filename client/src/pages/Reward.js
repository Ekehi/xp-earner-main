import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rewards = ({ userId }) => {
    const [dailyNextClaim, setDailyNextClaim] = useState(null);
    const [hour12NextClaim, set12HourNextClaim] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
            setDailyNextClaim(prev => prev ? new Date(prev) : null);
            set12HourNextClaim(prev => prev ? new Date(prev) : null);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <button onClick={claimDailyReward} disabled={dailyNextClaim && dailyNextClaim > new Date() || isLoading}>
                Claim Daily Reward {dailyNextClaim && dailyNextClaim > new Date() && `in ${calculateRemainingTime(dailyNextClaim)}`}
            </button>
            <button onClick={claim12HourReward} disabled={hour12NextClaim && hour12NextClaim > new Date() || isLoading}>
                Claim 12-Hour Reward {hour12NextClaim && hour12NextClaim > new Date() && `in ${calculateRemainingTime(hour12NextClaim)}`}
            </button>
        </div>
    );
};

export default Rewards;