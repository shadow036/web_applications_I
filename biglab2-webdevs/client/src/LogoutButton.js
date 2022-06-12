import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LogoutButton(props){


    const navigate = useNavigate();

    return(
        <Row>
            <Col>
                <Button variant="danger" onClick={ async () => {
                                                                await props.logout();
                                                                navigate('/');
                                                            }}>Logout</Button>
            </Col>
        </Row>
    )
}

export default LogoutButton;