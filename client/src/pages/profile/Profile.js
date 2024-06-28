import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "tailwindcss/tailwind.css"
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
<<<<<<< HEAD
import HomeTab from "../components/homeTab";
=======
import { AuthContext } from '../../services/authContext';
import { useInitData } from '@tma.js/sdk-react';
>>>>>>> 49c59a9b05ef5f51da38bec32c2594d70f25d8bb

const Profile = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);
    const initData = useInitData();
    const userData = initData.user;

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://xp-earner.onrender.com/api/v1/users/me', {
                headers: {
                    Authorization: `Bearer ${authState.token}`,
                },
            })
            .then((res) => {
                console.log(res);
                setUser(res.data.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                setError(err.response.data.message);
            });
    }, [authState.token]);

    // spinner while loading functionality
    if (loading) {
        return (
            <div className="container mt-5 center ">
                
                    <svg aria-hidden="true" class="inline  w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only"></span>
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
        <div className="w-full mt-5">
            <Row>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>User Information</Card.Title>
                            <Card.Text>Name: {user.name}</Card.Text>
                            <Card.Text>Email: {user.email}</Card.Text>
                            <Card.Text>Points: {user.xp_points}</Card.Text>
                        </Card.Body>
                    </Card>

                    <h3 className="mt-4">Finished Tasks</h3>

                    {user.completed_tasks &&
                        user.completed_tasks.length === 0 && (
                            <h6>You have not completed any tasks yet.</h6>
                        )}
                    <div className="row">
                        {user.completed_tasks &&
                            user.completed_tasks.length > 0 &&
                            user.completed_tasks.map((task, i) => (
                                <div key={i} className="col-lg-4 mb-3">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                {task.task_id.name}
                                            </Card.Title>
                                            <Card.Text>
                                                {task.task_id.description}
                                            </Card.Text>
                                            <Card.Text>
                                                XP Points:{' '}
                                                {task.task_id.xp_points}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                    </div>
                </Col>
                <Col lg={4}>
                    {/* Displaying Avatar/Profile Image */}
                    {userData.photoUrl && (
                        <img
                            src={userData.photoUrl}
                            alt="Profile Avatar"
                            className="mb-3"
                            style={{ maxWidth: '150px', height: '150px', borderRadius: '50%' }}
                        />
                    )}
                </Col>
            </Row>
            <HomeTab/>
        </div>
    );
};

export default Profile;
