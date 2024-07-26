import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
const { useNavigate } = require('react-router-dom');

const Tasks = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.expand();
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://xp-earner.onrender.com/api/v1/tasks', {
                withCredentials: true,
                credentials: 'include',
            })
            .then((res) => {
                console.log('data', res);
                setTasks(res.data.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.response.data.message);
                console.log(err);
            });
    }, []);

    // spinner while loading functionality

    if (loading) {
        return (
            <div className="container mt-5">
                <h2>Loading...</h2>
            </div>
        );
    }

    // error handling functionality

    if (error) {
        return (
            <div className="container mt-5">
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2>Complete Tasks to Earn XP</h2>
            <div className="row">
                {tasks &&
                    tasks.length > 0 &&
                    tasks.map((task, i) => (
                        <div key={task.id} className="col-lg-4 mb-3">
                            <Card>
                                <Card.Body>
                                    <div className='cardBody'>
                                    <div className='cardLeft'>
                                    <Card.Title>{task.name}</Card.Title>
                                    <Card.Text>
                                        Reward: {task.xp_points} Points
                                    </Card.Text>
                                    </div>
                                    <div className='cardRight'>
                                    <Button
                                        onClick={() => {
                                            navigate(`/task/${task.slug}`);
                                        }}
                                        variant="primary"
                                    >
                                       <BsArrowRight />
                                    </Button>
                                    </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
            </div>

            <div className='flex flex-col w-dvw h-screen  absolute  items-center justify-center isolate aspect-video  rounded-xl bg-black/70 backdrop-blur-xl shadow-lg'>
                    <p className='text-white m-auto absolute top-96 text-3xl font-mono'>
                    Coming Soon
                    </p>
                </div>
        </div>
    );
};

export default Tasks;
