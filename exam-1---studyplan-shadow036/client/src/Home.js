import NavigationBar from './NavigationBar';
import CourseList from './CourseList';

function Home(props){
    return  <>
                <NavigationBar access_type={props.access_type} set_access_type={props.set_access_type} logout={props.logout} logged_user={props.logged_user} />
                <CourseList courses={props.courses} set_validation={props.set_validation} temporary_study_plan={props.temporary_study_plan} set_temporary_study_plan={props.set_temporary_study_plan} set_courses={props.set_courses} validation={props.validation} logged_user={props.logged_user} access_type={props.access_type} logout={props.logout} set_flags={props.set_flags} flags={props.flags} />
            </>;
}

export default Home;