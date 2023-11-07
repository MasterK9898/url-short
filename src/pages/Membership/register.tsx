import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import './auth.scss';

const Register: React.FunctionComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        localStorage.setItem('user', JSON.stringify({
            username: username,
            email: email,
            company: company
        }));
        navigate("/membership");
    };

    return (
        <div className={classNames("register-container")}>
            <Card className={classNames("register-card")}>
                <Card.Body>
                    <Card.Title className={classNames("register-title")}>Step 1: Create an account</Card.Title>
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
                        <Form.Group controlId="email">
                            <Form.Label className={classNames("label-text")}>Email</Form.Label>
                            <Form.Control
                                type="email" // changed to email type
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className={classNames("input-field")}
                            />
                        </Form.Group>
                        <Form.Group controlId="company">
                            <Form.Label className={classNames("label-text")}>Company (Optional)</Form.Label>
                            <Form.Control
                                type="text"
                                value={company}
                                onChange={e => setCompany(e.target.value)}
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
                        <Form.Group controlId="confirmPassword">
                            <Form.Label className={classNames("label-text")}>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                className={classNames("input-field")}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className={classNames("register-btn")}>Proceed To Step 2: Select Plan</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className={classNames("member-purchase-prompt", "section")}>
                Have an account? <span className={classNames("member-purchase")} onClick={() => navigate("/membership-login")}>Back to login</span>
            </div>
        </div>
    );
};

export default Register;
