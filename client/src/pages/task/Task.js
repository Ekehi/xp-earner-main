import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
//import { tokenData } from '../../services/context';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../services/authContext';

const Task = () => {
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
        <div className="container mt-5">
            <h2>Task Details</h2>
            <Card>
                <Card.Body>
                    <Card.Title>{task.name}</Card.Title>
                    <Card.Body>{task.description}</Card.Body>
                    <br />
                    <Card.Subtitle>Reward: {task.xp_points} points</Card.Subtitle>
                    <br />
                    <ul>
                        {task.links && task.links.map((link, index) => 
                        (
                            <li key={index}>
                                <a href={link} target='_blank' rel='noopener noreferrer' onClick={() => handleLinkClick(index)}>
                                    Visit Link {index + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <br />
                    {!checkCompleted() ? (
                        <Button variant="success" onClick={handleClickComplete} disabled={!allLinkVisited}>
                            {allLinkVisited ? 'Claim Reward' : 'Complete Task'}
                        </Button>
                    ) : (
                        <Button variant="success" disabled>
                            Reward Claimed
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Task;
