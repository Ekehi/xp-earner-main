import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCopy, BsPersonAdd } from 'react-icons/bs';
import { Avatar } from '@telegram-apps/telegram-ui';

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
            <h1 className=" text-yellow-700 font-bold text-4xl">Invite Friends</h1>
            <p className='text-white mt-3 text-l font-mono'>invite friends to earn more points</p>
            <div className="relative flex flex-row w-full mt-4     ">
                <button
                    className="relative flex font-semibold text-medium justify-center text-center  w-2/3 bg-yellow-500 border-2 border-yellow-500 rounded-xl text-white m-auto py-3 shadow-inner transform transition-transform duration-150 ease-in-out"
                    onClick={referralLink}> Invite Friends <BsPersonAdd className='text-white ml-3  text-xl font-bold ' />
                </button>
                <button
                    className="relative flex font-semibold text-medium justify-center text-center  w-fit bg-transparent border-2 border-yellow-500 rounded-xl text-white m-auto  p-3 transform transition-transform duration-150 ease-in-out"
                > Copy <BsCopy className='text-yellow-500 ml-2 mt-1 ' />
                </button>
                <p className=" ">{referralLink}</p>

            </div>

            <h2 className="relative text-white font-bold mt-4 ml-2 text-start w-full ">Your Refferal Bonus :</h2>

            <div className='relative flex w-full h-fit border-2 mt-3 rounded-xl p-3 border-b-0 shadow-yellow-500 shadow-xl border-yellow-500'>
                <Avatar
                    size={50}
                    src="50.png"
                    className="flex h-full  my-auto align-middle circle-outer  delay-[10000ms]"
                />
                <p className="relative flex justify-center ml-2 items-center text-gray-400 font-mono text-xl">
                    {/*  {Bonus} */}
                </p>
            </div>

            <div className="flex flex-col  w-full relative mt-5 p-2  ">
                <h2 className="relative text-white font-bold ">Your Friends List :</h2>
                <ul className="relative flex w-full mt-3 border-2 border-b-0 rounded-xl border-yellow-500">
                    {friends.map((friend) => (
                        <li className="relative flex text-white justify-between p-2 "
                            key={friend.id}>
                            <span className='block'>{friend.name}</span> <span className='block'>{friend.status}</span>  <span className='block'>{bonuses[friend.id] || 0}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Friends;
