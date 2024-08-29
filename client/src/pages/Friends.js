import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Friends = () => {
  const [referralLink, setReferralLink] = useState('');
  const [friends, setFriends] = useState([]);
  const [bonuses, setBonuses] = useState({});

  // Fetch referral link
  const fetchReferralLink = async () => {
    try {
      const response = await axios.get('/api/referral-link'); // Update with your API endpoint
      setReferralLink(response.data.link);
    } catch (error) {
      console.error('Error fetching referral link:', error);
    }
  };

  // Fetch list of friends and referral bonuses
  const fetchFriendsAndBonuses = async () => {
    try {
      const [friendsResponse, bonusesResponse] = await Promise.all([
        axios.get('/api/friends'), // Update with your API endpoint
        axios.get('/api/bonuses')  // Update with your API endpoint
      ]);
      setFriends(friendsResponse.data);
      setBonuses(bonusesResponse.data);
    } catch (error) {
      console.error('Error fetching friends or bonuses:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchReferralLink();
    fetchFriendsAndBonuses();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className=" text-white font-extrabold text-4xl">Invite Friends</h1>
      <p className='text-white mt-3 text-xl font-mono'>invite friends to earn more points</p>
      <div className="relative flex flex-row w-1/2 mt-4 ">
        <h2 className="">Your Referral Link</h2>
        <p className=" ">{referralLink}</p>
      </div>
      <div className="">
        <h2 className="">Friends List</h2>
        <ul className="">
          {friends.map((friend) => (
            <li  className=""
            key={friend.id}>
              {friend.name} - Referral Status: {friend.status} - Bonus: {bonuses[friend.id] || 0}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Friends;
