import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddButton(){
    
    const navigate = useNavigate();

    return  <Row className="container-fluid">
                <Col>
                    <Button className="rounded-circle" onClick={() => navigate('/AddForm')}>+</Button>
                </Col>
            </Row>;
}

export default AddButton;