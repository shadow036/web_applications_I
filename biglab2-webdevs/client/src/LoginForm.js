import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import './MyForm.css';

function LoginForm(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <Form onSubmit={async (event) => {
                    event.preventDefault();
                    const credentials = {"username": email,"password": password}
                    
                    props.login(credentials);
                }
            }>
                <Row>
                    <Col xs={1} />
                    <Col xs={2}>
                        <Form.Control type="text" required placeholder="email" pattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' onChange={event => setEmail(event.target.value)}/>
                    </Col>
                    <Col xs={2}>
                        <Form.Control type="password" required placeholder="password" onChange={event => setPassword(event.target.value)}/>
                    </Col>
                    <Col xs={2} />
                    <Col xs={2}>
                        <Form.Control type="submit" className="green_background" value="Login"/>
                    </Col>
                    <Col xs={2}>
                        <Form.Control type="reset" onClick={() => {
                                                                        setEmail('');
                                                                        setPassword('');
                                                                    }} id="red_background" value="Reset" />
                    </Col>
                    <Col xs={1} />
                </Row>
            </Form>;
}

export default LoginForm;