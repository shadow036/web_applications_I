import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";

import StandardTable  from './StandardTable';
import StudyPlanTypeChoice from './StudyPlanTypeChoice';
import StudyPlanTable from './StudyPlanTable';

import './Table.css'

function CourseList(props){

    if(props.access_type === 2)
        return <StandardTable courses={props.courses} flags={props.flags} temporary_study_plan={props.temporary_study_plan} edit_mode={ false } set_flags={props.set_flags} />;
    else if(!props.temporary_study_plan.confirmed){
        return <Row>
                    <Col xs={9}>
                        <StandardTable courses={props.courses} edit_mode={false} set_courses={props.set_courses} set_temporary_study_plan={props.set_temporary_study_plan} temporary_study_plan={props.temporary_study_plan} flags={props.flags} set_flags={props.set_flags}/>
                    </ Col>
                    <Col xs={2}>
                        <StudyPlanTypeChoice temporary_study_plan={props.temporary_study_plan} set_temporary_study_plan={props.set_temporary_study_plan} />
                    </Col>
                </Row>
    }else{
        return  <Row>
                    <Col xs={6}>
                        <StandardTable courses={props.courses} temporary_study_plan={props.temporary_study_plan} edit_mode={true} set_flags={props.set_flags} set_courses={props.set_courses} set_temporary_study_plan={props.set_temporary_study_plan} flags={props.flags} />
                    </Col>
                    <Col xs={5}>
                        <StudyPlanTable validation={props.validation} temporary_study_plan={props.temporary_study_plan} courses={props.courses} set_temporary_study_plan={props.set_temporary_study_plan} set_courses={props.set_courses} set_validation={props.set_validation} logged_user={props.logged_user} logout={props.logout} />
                    </Col>        
                </Row>
    }
}

export default CourseList;