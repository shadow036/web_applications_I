import { Form, Row } from "react-bootstrap";

function StudyPlanTypeChoice(props){
    return  <>
                In order to create a new study plan, choose a study plan type:
                <Row>
                    <Form onSubmit={(event) => {
                                            event.preventDefault();
                                            const element = document.querySelector("#select").value;
                                            props.set_temporary_study_plan({"courses": props.temporary_study_plan.courses, "type": element, "confirmed": true});
                    }}>
                        <Form.Select id="select">
                            <option>Full time</option>
                            <option>Part time</option>
                        </Form.Select>
                        <Form.Control type='submit' variant='success' value="Submit" />
                    </Form>
                </Row>
            </>;
}

export default StudyPlanTypeChoice;