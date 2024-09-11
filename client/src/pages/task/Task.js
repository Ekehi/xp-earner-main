import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../services/authContext';

const Task = ({ }) => {
    const [task, setTask] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [clickComplete, setClickComplete] = useState(false);
    const [user, setUser] = useState(null);
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const { taskSlug } = useParams();
    const [linkStatus, setLinkStatus] = useState([]);
    const [allLinkVisited, setAllLinkVisited] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios
            .get(`https://xp-earner.onrender.com/api/v1/tasks/${taskSlug}`)
            .then((res) => {
                setTask(res.data.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.response.data.message);
                console.log(err);
            });

        if (authState.token) {
            setLoading(true);

            axios
                .get('https://xp-earner.onrender.com/api/v1/users/me', {
                    headers: {
                        Authorization: `Bearer ${authState.token}`,
                    },
                })
                .then((res) => {
                    setUser(res.data.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    setError(err.response.data.message);
                    console.log(err);
                });
        }
    }, [taskSlug, clickComplete, authState.token]);

    useEffect(() => {
        if (task && task.links) {
            setLinkStatus(Array(task.links.length).fill(false));
        }
    }, [task]);

    const handleLinkClick = (index) => {
        const newLinkStatus = [...linkStatus];
        newLinkStatus[index] = true;
        setLinkStatus(newLinkStatus);

        if (newLinkStatus.every(status => status)) {
            setAllLinkVisited(true);
        }
    };

    const checkCompleted = () => {
        if (user) {
            const completedTasks = user.completed_tasks || [];
            return completedTasks.some(
                (completedTask) => completedTask.task_id._id === task._id
            );
        }
        return false;
    };

    const handleCompleteTask = async () => {
        if (authState.token) {
            if (!checkCompleted()) {
                const data = {
                    task_id: task._id,
                };
                try {
                    await axios.patch(
                        `https://xp-earner.onrender.com/api/v1/users/complete-task/${task._id}`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${authState.token}`,
                            }
                        },
                    );
                    setClickComplete(!clickComplete);
                } catch (err) {
                    setError(err.response.data.message);
                    console.log(err);
                }
            }
        } else {
            setError('You must be logged in to complete a task');
            setTimeout(() => {
                setError('');
                navigate('/login');
            }, 3000);
        }
    };

    const handleClickComplete = () => {
        toast.promise(
            handleCompleteTask(),
            {
                loading: 'loading...',
                success: 'Task Completed 🎉',
                error: 'Could not complete Task'
            }
        );
    };

    const handleClose = () => {
        navigate('/tasks');
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <h2>{error}</h2>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="container mt-5">
                <h2>Task not found</h2>
            </div>
        );
    }


    return (
        <div className="container absolute flex flex-col content-between h-svh w-full z-20 aspect-video  bg-black/90 backdrop-blur-xl shadow-lg">


            <Card className=' absolute flex flex-col justify-center items-center m-auto bottom-0 z-20 w-dvw h-2/3 bg-black border-t-2 border-yellow-500 rounded-t-3xl '>
                <Card.Body className='flex flex-col p-4 items-center w-full'>
                    <div className='relative -mt-32 mb-4 p-1 border-aninmation w-fit h-fit rounded-t-full'>
                        <div className='relative bg-black p-2 rounded-t-full'>
                            <div className=' relative  h-[100px] w-[100px] border-[3px] bg-black border-yellow-500 p-2 rounded-t-full shadow-sm-light shadow-yellow-500 '
                            >
                                <img
                                    src='/200.png'
                                    className=' circle-inner top-glow shadow-sm-light shadow-yellow-500 rounded-full bg-transparent animate-pulse delay-[999ms]' />
                            </div>
                        </div>

                    </div>

                    <a
                        href='#tasks'
                        className="absolute top-1 right-1  flex  w-10 h-10 text-xl text-yellow-700 font-bold p-2 justify-center rounded-full"
                        onClick={handleClose}
                    >
                        X
                    </a>
                    <Card.Title className='text-yellow-500 font-bold text-xl'>{task.name}</Card.Title>
                    <div className='text-white my-[2px] h-fit'>{task.description}</div>
                    <ul className='text-white w-full flex content-center justify-center flex-col '>
                        {task.links && task.links.map((link, index) =>
                        (
                            <li key={index}
                                className='my-3 w-full content-center justify-center flex   '>
                                <a href={link} target='_blank' rel='noopener noreferrer' onClick={() => handleLinkClick(index)}
                                    className='bg-transparent border-2 border-yellow-500 text-white rounded-xl w-1/2 py-2 flex justify-center '>
                                    Visit Link {index + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-row h-fit mb-3 justify-end align-middle text-center w-fit'>
                       <img
                          src="/50.png"
                           className="inline  my-auto align-middle w-[20px] h-[20px]"
                       />
                       <Card.Subtitle className='text-yellow-500 ml-2 pt-1 text-lg font-bold'>
                          +{task.xp_points} points</Card.Subtitle>
                  </div>


                    <div className='absolute  w-full bottom-4 flex justify-center'>
                        {!checkCompleted() ? (
                            <Button variant="" onClick={handleClickComplete} disabled={!allLinkVisited}
                                className=' bg-yellow-500 text-white font-bold  rounded-2xl border-[3px] border-yellow-500 w-2/3 p-3 '>
                                {allLinkVisited ? 'Claim Reward' : 'Complete Task'}
                            </Button>
                        ) : (
                            <Button variant=" "
                                className=' bg-yellow-500 text-white font-bold rounded-2xl border-[3px] border-yellow-500 w-2/3 p-3 ' disabled>
                                Reward Claimed
                            </Button>
                        )}
                        </div>
                    

                </Card.Body>
            </Card>
        </div>
    );
};

export default Task;
