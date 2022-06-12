import { useState } from 'react';
import LogoutButton from './LogoutButton';
import { Form, Navbar } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { BsCollectionPlay } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './App.css';

function NavigationBar(props){

    const [custom_filter, setCustom_filter] = useState("");
    const navigate = useNavigate();

    return  (<Navbar bg="primary" variant="light">
                <Col className="white_text" xs={4}><BsCollectionPlay /> Film Library</Col>
                <Col xs={6}>
                    <Form onSubmit={event => {
                        event.preventDefault();
                        navigate(`/Filters/"${custom_filter}"`)
                    }}>
                        <Row>
                            <Col xs={2}>
                                <Form.Control type="text" placeholder="Filter" required onChange={(event) => setCustom_filter(event.target.value)}/>
                            </Col>
                            <Col xs={2}>
                                <Form.Control type="submit" value="Search" className="green_background"/>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={1}><LogoutButton logout={props.logout} /></Col>
                <Col className="white_text" xs={1}><FaUserCircle size={25}/></Col>
            </Navbar>);
}

export default NavigationBar;