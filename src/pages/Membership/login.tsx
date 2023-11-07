import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import './auth.scss';


const Login: React.FunctionComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify({username: username}));
        navigate("/landing");
    };

    return (
        <div className={classNames("login-container")}>
            <Card className={classNames("login-card")}>
                <Card.Body>
                    <Card.Title className={classNames("login-title")}>Member Login</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className={classNames("label-text")}>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                className={classNames("input-field")}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label className={classNames("label-text")}>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className={classNames("input-field")}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className={classNames("login-btn", "dashbord")}>Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className={classNames("member-purchase-prompt")}>
                Don't have membership? <span className={classNames("member-purchase")} onClick={() => navigate("/membership-register")}>Purchase here!</span>
            </div>
        </div>
    );
};

export default Login;
