import { Table, Button } from "react-bootstrap";

import { format_table, check_add, find_right_style, find_course_in_flags } from './utility';
import './Table.css'

function StandardTable(props){
        return <Table bordered>
                    <thead>
                        <tr> 
                            <th>Code</th>
                            <th>Name</th>
                            <th>Credits</th>
                            <th>Current students</th>
                            <th>Maximum students</th>
                            
                            {format_table(props.flags)[0] && <th className="header">Incompatible course(s)</th>}
                            {format_table(props.flags)[1] && <th className="header">Preparatory course</th>}               
                            
                            <th>Expand/Reduce</th>
                            {props.edit_mode && <th>Add</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {props.courses.map(course => (
                                                        <tr key={course.code}>
                                                            <td className={find_right_style(course, props.temporary_study_plan)}>{course.code}</td>
                                                            <td className={find_right_style(course, props.temporary_study_plan)}>{course.name}</td>
                                                            <td className={find_right_style(course, props.temporary_study_plan)}>{course.credits}</td>
                                                            <td className={find_right_style(course, props.temporary_study_plan)}>{course["current students"]}</td>
                                                            <td className={find_right_style(course, props.temporary_study_plan)}>{course["maximum students"]}</td>

                                                            {find_course_in_flags(course, props.flags) && format_table(props.flags)[0] && course["incompatible course(s)"] !== null && <td className={find_right_style(course, props.temporary_study_plan)}>{course["incompatible course(s)"]}</td>}
                                                            {(!find_course_in_flags(course, props.flags) || course["incompatible course(s)"] === null) && format_table(props.flags)[0] && <td />}
                                                            {find_course_in_flags(course, props.flags) && format_table(props.flags)[1] && course["preparatory course"] !== null && <td className={find_right_style(course, props.temporary_study_plan)}>{course["preparatory course"]}</td>}
                                                            {(!find_course_in_flags(course, props.flags) || course["preparatory course"] === null) && format_table(props.flags)[1] && <td />}
                                                            {!find_course_in_flags(course, props.flags) && (course["incompatible course(s)"] !== null || course["preparatory course"] !== null) && <td><Button variant='success' onClick={() => props.set_flags(course) }>Expand</Button></td>}
                                                            {find_course_in_flags(course, props.flags) && <td><Button variant='danger' onClick={() => props.set_flags(course)}>Reduce</Button></td>}
                                                            {course["preparatory course"] === null && course["incompatible course(s)"] === null && <td className='red'>No more info</td>}
                                                            {props.edit_mode && (check_add(course, props.temporary_study_plan))[0] && <td><Button variant="success" onClick={
                                                                        () => {
                                                                            props.set_temporary_study_plan({"courses": [...props.temporary_study_plan.courses, course.code], "type": props.temporary_study_plan.type, "confirmed": true});
                                                                            props.set_courses(props.courses.map(c => {
                                                                                if(c.code !== course.code)
                                                                                    return c;
                                                                                else
                                                                                    return { "code": c.code,"name": c.name,"credits": c.credits,"current students": c["current students"]+1,"maximum students": c["maximum students"],"incompatible course(s)": c["incompatible course(s)"],"preparatory course": c["preparatory course"]}
                                                                            }))
                                                                        }
                                                                    }>Add</Button></td>}
                                                                    {!(check_add(course, props.temporary_study_plan)[0]) && <td className='red'>{check_add(course, props.temporary_study_plan)[1]}</td>}
                                                        </tr>
                                                )
                                    )
                        }
                                                    
                        </tbody>
                    </Table>;
}

export default StandardTable;