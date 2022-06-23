import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";

import './LoginForm.css';

function LoginForm(props){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return  <>  
                {props.access_type === 0 && <Alert variant="danger">Incorrect credentials!</Alert>}
                <Form onSubmit={ (event) =>  {
                                                event.preventDefault();
                                                props.login({"username": username, "password": password});
                                            }
                            }>
                <Row>
                    <Col xs={2}>
                        <Form.Control type="text" placeholder="username/id" required pattern='^s[0-9]{6}$' onChange={(event) => setUsername(event.target.value)} />
                    </Col>
                    <Col xs={2}>
                        <Form.Control type="password" placeholder="password" required onChange={(event) => setPassword(event.target.value)} />
                    </Col>
                    <Col xs={2} />
                    <Col xs={2}>
                        <Form.Control type="submit" value="Login" id="green_background" />
                    </Col>
                    <Col xs={2}>
                        <Form.Control type="button" value="Access as guest" id="yellow_background" onClick={(event) =>    {
                                                                                                                        event.preventDefault();
                                                                                                                        props.set_access_type(2);
                                                                                                                    }}/>
                    </Col>
                    <Col xs={2}>
                        <Form.Control type="reset" value="Clear" id="red_background" onClick={() => {
                                                                                                        setUsername('');
                                                                                                        setPassword('');
                                                                                                    }} />
                    </Col>
                </Row>
            </Form>
        </>;
}

export default LoginForm;