import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCopy, BsPersonAdd, BsShare } from 'react-icons/bs';
import { Avatar } from '@telegram-apps/telegram-ui';

const Friends = () => {
  const [bonus, setBonus] = useState(0);
  const [friendCount, setFriendCount] = useState(0);
  const [copySuccess, setCopySuccess] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('JWT');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
      setError('User is not authenticated');
    }
  }, []);

  const fetchUserData = (token) => {
    axios
      .get('https://xp-earner.onrender.com/api/v1/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const userData = res.data.data.data;
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to fetch user data');
        setLoading(false);
      });
  };

  // Fetch Telegram user ID
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const initData = window.Telegram.WebApp.initDataUnsafe;

      if (initData && initData.user) {
        setUserId(initData.user.id.toString() || '');
      }
    }
  }, []);

  // Generate the referral link using the retrieved user ID
  const referralLink = userId ? `https://t.me/EkehiBot?start=${userId}` : '';
  console.log(userId);

  // Copy referral link to clipboard
  const handleCopy = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopySuccess('Copied Successfully 😊');
        setTimeout(() => {
          setCopySuccess('');
        }, 2000);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };

  // Share via Telegram using Telegram's Web App shareData
  const handleTelegramShare = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.shareData(referralLink);
    } else {
      // Fallback: open Telegram share URL in a new window
      window.open(
        `https://t.me/share/url?url=${referralLink}&text=Join%20me%20on%20Ekehi%20Bot`,
        '_blank'
      );
    }
  };

  // Share with other apps using the Web Share API
  const handleOtherAppShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Join me on Ekehi Bot!',
          text: 'Check out this cool app where you can earn points.',
          url: referralLink,
        })
        .then(() => console.log('Shared successfully!'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in this browser.');
    }
  };

  if (loading) {
        return (
            <div className="flex flex-row container w-screen h-screen m-auto justify-items-center">
                <div className="relative flex self-center m-auto w-full">
                    <svg
                        aria-hidden="true"
                        className="inline container m-auto w-10 h-10 text-grey-700 animate-spin dark:text-gray-600 fill-yellow-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
            </div>
        );
    }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id='Friends' className='container mt-5'>
      <h1 className='text-yellow-700 font-bold text-4xl'>Invite Friends</h1>
      <p className='text-white mt-3 text-l font-mono'>
        Invite friends to earn more points
      </p>
      <div className='relative flex flex-row w-full mt-4'>
        <button
          className='relative flex font-semibold text-medium justify-center text-center w-2/3 bg-yellow-500 border-2 border-yellow-500 rounded-xl text-white m-auto py-3 shadow-inner transform transition-transform duration-150 ease-in-out'
          onClick={handleTelegramShare}
        >
          Invite Friends <BsPersonAdd className='text-white ml-3 text-xl font-bold' />
        </button>
        <button
          className='relative flex font-semibold text-medium justify-center text-center w-fit bg-transparent border-2 border-yellow-500 rounded-xl text-white m-auto p-3 transform transition-transform duration-150 ease-in-out'
          onClick={handleCopy}
        >
          Copy <BsCopy className='text-yellow-500 ml-2 mt-1' />
        </button>
        <button
          className='relative flex font-semibold text-medium justify-center text-center w-fit bg-transparent border-2 border-yellow-500 rounded-xl text-white m-auto p-3 transform transition-transform duration-150 ease-in-out'
          onClick={handleOtherAppShare}
        >
          Share <BsShare className='text-yellow-500 ml-2 mt-1' />
        </button>
      </div>
      {copySuccess && (
        <p className='text-yellow-500 text-center text-lg font-bold mt-2'>
          {copySuccess}
        </p>
      )}

      <h2 className='relative text-white font-bold mt-4 ml-2 text-start w-full'>
        Your Referral Bonus:
      </h2>
      <div className='relative flex w-full h-fit border-2 mt-3 rounded-xl p-3 border-b-0 shadow-yellow-500 shadow-xl border-yellow-500'>
        <Avatar
          size={50}
          src='50.png'
          className='flex h-full my-auto align-middle circle-outer delay-[10000ms]'
        />
        <p className='relative flex justify-center ml-2 items-center text-gray-400 font-mono text-xl'>
          {bonus} points
        </p>
      </div>

      <div className='flex flex-col w-full relative mt-5 p-2'>
        <h2 className='relative text-white font-bold'>Friends Invited:</h2>
        <p className='relative text-white text-xl'>{friendCount} Friends Invited</p>
      </div>
    </div>
  );
};

export default Friends;
