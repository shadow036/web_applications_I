import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Navbar, Button, Alert } from "react-bootstrap";
import { FcGraduationCap } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import './NavigationBar.css';

function NavigationBar(props){

    const navigate = useNavigate();
    
    return  <>
                {props.access_type === 3 && <Alert variant="success">Welcome {props.logged_user.surname}, {props.logged_user.name}!</Alert>}
                {props.access_type === 2 && <Alert variant="warning">Welcome, Guest!</Alert>}
                <Navbar id="navbar_background">
                    <Col xs={1}><FcGraduationCap size={50} /></Col>
                    <Col xs={9} />
                    {props.access_type === 2 && <Col className="button_align" xs={1}><Button variant='success' onClick={() => {
                                                                        props.set_access_type(1);
                                                                        navigate('/login');
                                                                    }}>Login</Button></Col>}
                    {props.access_type === 3 && <Col className="button_align" xs={1}><Button variant='danger' onClick={() => {
                                                                        props.logout();
                                                                        navigate('/login');
                                                                    }}>Logout</Button></Col>}
                </Navbar>
            </>
};

export default NavigationBar;