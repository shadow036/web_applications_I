async function load_courses(){
    try{
        const response = await fetch("http://localhost:3001/api/v1/courses");
        if(response.ok){
            const courses = await response.json();
            return courses;
        }else{
            const error = await response.text();
            throw new TypeError(error);
        }
    }catch(err){
        throw err;
    }
}

async function load_study_plan(id){
  try{
      const response = await fetch("http://localhost:3001/api/v1/study_plan/" + id);
      if(response.ok){
          const study_plan = await response.json();
          return study_plan;
      }else{
          const error = await response.text();
          throw new TypeError(error);
      }
  }catch(err){
      throw err;
  }
}

async function delete_study_plan(id){
  try{
    const response = await fetch("http://localhost:3001/api/v1/delete/" + id, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(response.ok){
        await response.json();
        return true;
    }else{
        const error = await response.text();
        throw new TypeError(error);
    }
  }catch(err){
    throw err;
  }
}

async function save_study_plan(id, study_plan){
  try{
    const response = await fetch("http://localhost:3001/api/v1/save/" + id, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(study_plan),
      headers: {
        'Content-Type': 'application/json',
      }});
    if(response.ok){
      await response.json();
      return [true, "dummy"];
    }else{
      const error = await response.text();
      return [false, error];
    }
  }catch(err){
    return [false, err];
  }
}

async function update_courses(courses){
  try{
    const response = await fetch("http://localhost:3001/api/v1/update_courses", {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(courses),
      headers: {
        'Content-Type': 'application/json',
      }});
    if(response.ok){
      await response.json();
      return true;
    }else{
      const error = await response.text();
      throw new TypeError(error);
    }
  }catch(err){
    throw err;
  }
}

async function send_credentials(credentials){
    const response = await fetch("http://localhost:3001/api/v1/sessions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });
    if(response.ok) {
        const user = await response.json();
        return user;
    }else{
        const errDetails = await response.text();
        throw errDetails;
    }
}
  
  const logout_api = async() => {
    const response = await fetch('http://localhost:3001/api/v1/sessions/current', {
        credentials: 'include',
        method: 'DELETE',
    });
    if (response.ok)
      return null;
  }

export { load_courses, send_credentials, logout_api , load_study_plan, delete_study_plan, save_study_plan, update_courses};