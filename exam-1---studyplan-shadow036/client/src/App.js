import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 

import { load_courses, load_study_plan, send_credentials, logout_api } from './API';
import { sleep, find_course_in_flags } from './utility';
import Home from './Home';
import LoginForm from './LoginForm';

function App() {

  /*
  0 = incorrect credentials => go back to login
  1 = guest who wants to login => go to login or default
  2 = guest who wants to access as guest => go to homepage
  3 = logged user => go to homepage
  */

  const [logged_user, setLogged_user] = useState(undefined);
  const [access_type, setAccess_type] = useState(2);
  const [courses, setCourses] = useState([]);
  const [flags, setFlags] = useState([]);
  const [temporary_study_plan, setTemporary_study_plan] = useState({"courses": [], "type": "", "confirmed": false});
  const [validation, setValidation] = useState([false, false]);

  useEffect(() => { // initial load of the courses
    async function load_data_wrapper(){
      const courses = await load_courses();
      setCourses(courses);
    }
    load_data_wrapper();
  }, []); 

  async function set_validation(value){   // controls the display of the credits exceeded warning
    setValidation(value);
    await sleep(2);
    setValidation([false, value[1]]);
  }

  function set_courses(value){
    setCourses(value);
  }

  function set_temporary_study_plan(value){
    setTemporary_study_plan(value);
  }

  function set_flags(target_course){
    if(find_course_in_flags(target_course, flags)){
      setFlags(list => {
                    return list.filter(
                            course => target_course.code !== course.code
                    )
      });
    }else
      setFlags(list => [...list, target_course]);
  }

  function set_access_type(login_type){
    setAccess_type(login_type);
  }

  async function login(credentials){
      try {
        const user = await send_credentials(credentials);
        setLogged_user(user);
        setAccess_type(3);
        const study_plan = await load_study_plan(user.id);  // fetch study plan of logged user
        if(study_plan["study plan"] !== null)
          setTemporary_study_plan({"courses": study_plan["study plan"].split(','), "type": study_plan["study plan type"], "confirmed": true});  // if study plan exist assign it to the state
      }catch(err) {
        console.log(err);
        setAccess_type(0);
      }
    
  }

  async function logout(){
    await logout_api();
    const courses = await load_courses();
    setCourses(courses);  // reload courses state variable each time a user logs out to save potential modifications
    setLogged_user(undefined);  // reset everything
    setTemporary_study_plan({"courses": [], "type": "", "confirmed": false});
    setAccess_type(1);
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={access_type >= 2 ? <Home courses={courses} temporary_study_plan={temporary_study_plan} validation={validation} logged_user={logged_user} access_type={access_type} set_access_type={set_access_type} logout={logout} set_flags={set_flags} set_courses={set_courses} set_temporary_study_plan={set_temporary_study_plan} flags={flags} set_validation={set_validation} /> : <Navigate replace to="/login" />} />
        <Route path='/login' element={access_type < 2 ? <LoginForm login={login} access_type={access_type} set_access_type={set_access_type} /> : <Navigate replace to="/" />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
