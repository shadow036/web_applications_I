import { Table, Button, Row, Col, Alert} from "react-bootstrap";
import { IoIosWarning } from 'react-icons/io';

import { update_courses, save_study_plan, delete_study_plan, load_study_plan, load_courses } from './API';
import { get_course_by_id, find_right_style_max_credits, check_remove, check_max_credits } from './utility';

function StudyPlanTable(props){ 
    return <>
            <Row>
                <h1>Study plan: {props.temporary_study_plan.type}</h1>
            </Row>
            <Table col={10} bordered>
                <thead>
                    <tr> 
                        <th>Code</th>
                        <th>Name</th>
                        <th>Credits</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {props.temporary_study_plan.courses.map(course => (
                                                    <tr key={course}>
                                                        {(check_remove(course, props.courses, props.temporary_study_plan)[0]) && <td>{course}</td>}
                                                        {!(check_remove(course, props.courses, props.temporary_study_plan)[0]) && <td className='red'>{course}</td>}
                                                        {(check_remove(course, props.courses, props.temporary_study_plan)[0]) && <td>{get_course_by_id(props.courses,course).name}</td>}
                                                        {!(check_remove(course, props.courses, props.temporary_study_plan)[0]) && <td className='red'>{get_course_by_id(props.courses,course).name}</td>}
                                                        {(check_remove(course, props.courses, props.temporary_study_plan)[0]) && <td>{get_course_by_id(props.courses,course).credits}</td>}
                                                        {!(check_remove(course, props.courses, props.temporary_study_plan)[0]) && <td className='red'>{get_course_by_id(props.courses,course).credits}</td>}
                                                        
                                                        {check_remove(course, props.courses, props.temporary_study_plan)[0] && <td><Button variant="danger" onClick={
                                                            () =>   {
                                                                        props.set_temporary_study_plan(old => ({"courses": old.courses.filter(c => c !== course), "type": old.type, "confirmed": true}));
                                                                        props.set_courses(props.courses.map(c => {
                                                                            if(c.code !== course)
                                                                                return c;
                                                                            else
                                                                                return { "code": c.code,"name": c.name,"credits": c.credits,"current students": c["current students"]-1,"maximum students": c["maximum students"],"incompatible course(s)": c["incompatible course(s)"],"preparatory course": c["preparatory course"]}
                                                                        }))
                                                                }
                                                            }
                                                        >Remove</Button></td>}
                                                        {!(check_remove(course, props.courses, props.temporary_study_plan)[0]) && <td className='red'>{check_remove(course, props.courses, props.temporary_study_plan)[1]}</td>}
                                                    </tr>
                                            )
                                )
                    }
                    <tr>
                        <td className={find_right_style_max_credits(props.courses, props.temporary_study_plan)}>{!(check_max_credits(props.courses, props.temporary_study_plan)[0]) && <IoIosWarning size={70} />}</td>
                        <td className={find_right_style_max_credits(props.courses, props.temporary_study_plan)}>Total credits <br />The range for "{props.temporary_study_plan.type}" is [{props.temporary_study_plan.type === "Full time" ? "60-80" : "20-40"}]</td>
                        <td className={find_right_style_max_credits(props.courses, props.temporary_study_plan)}>{props.temporary_study_plan.courses.reduce((partial_sum, next_element) => partial_sum + get_course_by_id(props.courses, next_element).credits, 0)}</td>
                        <td></td>
                    </tr>
                    </tbody>
                </Table>
                <Row>
                    <Col xs={3} />
                    <Col xs={2}>
                        <Button variant="success" onClick=  {
                                                                async () =>   {
                                                                            const check = check_max_credits(props.courses, props.temporary_study_plan);
                                                                            if(!(check[0]))
                                                                                props.set_validation([!(check[0]), check[1]]);
                                                                            else{
                                                                                const result = await save_study_plan(props.logged_user.id, props.temporary_study_plan);
                                                                                if(!result[0])
                                                                                    alert(result[1])
                                                                                else{
                                                                                    await update_courses(props.courses);   
                                                                                    const new_study_plan = await load_study_plan(props.logged_user.id);  // fetch study plan of logged user
                                                                                    const new_courses = await load_courses();
                                                                                    props.set_courses(new_courses);
                                                                                    props.set_temporary_study_plan({"courses": new_study_plan["study plan"].split(','), "type": new_study_plan["study plan type"], "confirmed": true});
                                                                                }
                                                                            }
                                                                        }
                                                            }>Save</Button>
                    </Col>
                    <Col xs={2}>
                        <Button variant="warning" onClick=  {
                                                                () =>{
                                                                    props.set_temporary_study_plan(old => ({"courses": old.courses, "type": props.temporary_study_plan.type === "Full time" ? "Part time" : "Full time", "confirmed": true}));
                                                                }
                                                            }
                        >{props.temporary_study_plan.type === "Full time" ? "Part time" : "Full time"}</Button>
                    </Col>
                    <Col xs={2}>
                        <Button variant="danger" onClick=   {
                                                                async () => {
                                                                    const original_study_plan = await load_study_plan(props.logged_user.id);  // fetch study plan of logged user
                                                                    const original_courses = await load_courses();
                                                                    if(original_study_plan["study plan"] !== null)
                                                                        props.set_temporary_study_plan({"courses": original_study_plan["study plan"].split(','), "type": original_study_plan["study plan type"], "confirmed": true});  // if study plan exist assign it to the state
                                                                    else
                                                                        props.set_temporary_study_plan({"courses": [], "type": "", "confirmed": false});
                                                                    props.set_courses(original_courses);
                                                                }
                                                            }>Cancel</Button>
                    </Col>
                    <Col xs={2}>
                        <Button variant="danger" onClick=   {
                                                                    async () => {
                                                                        await update_courses(props.courses.map(c => {
                                                                            if(props.temporary_study_plan.courses.find(c2 => c2 === c.code))
                                                                                return { "code": c.code,"name": c.name,"credits": c.credits,"current students": c["current students"]-1,"maximum students": c["maximum students"],"incompatible course(s)": c["incompatible course(s)"],"preparatory course": c["preparatory course"]}
                                                                            else 
                                                                                return c
                                                                        }))
                                                                        await delete_study_plan(props.logged_user.id);
                                                                        const new_courses = await load_courses();
                                                                        props.set_courses(new_courses);
                                                                        props.set_temporary_study_plan({"courses": [], "type": "", "confirmed": false});
                                                                }
                                                            }>Delete</Button>
                    </Col>
                    <Col xs={1} />
                </Row>
                <Row>
                    {props.validation[0] && <Alert variant='danger'>Total credits {props.validation[1] ? "over" : "under"} the {props.validation[1] ? "maximum" : "minimum"} threshold</Alert>}
                </Row>
            </>
}

export default StudyPlanTable;