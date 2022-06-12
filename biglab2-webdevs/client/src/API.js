async function fetch_filtered_films(filter, logged_user){
    try{
        const response = await fetch("http://localhost:3001/api/v1/films/filters/" + filter + "/" + logged_user, {
            credentials: 'include',
        });
        if(response.ok){
            const filtered_films = await response.json();
            return filtered_films;
        }else{
            const error = await response.text();
            throw new TypeError(error);
        }
    }catch(error){
        throw error;
    }
}

async function fetch_initial_films(){
    try{
        const response = await fetch("http://localhost:3001/api/v1/films", {
            credentials: 'include',
        });
        if(response.ok){
            const films = await response.json();
            return films;
        }else{
            const error = await response.text();
            return new TypeError(error);
        }
    }catch(error){
        throw error;
    }
}

async function fetch_film_by_id(id){
    try{
        const response = await fetch("http://localhost:3001/api/v1/films/" + id, {
            credentials: 'include',
        });
        if(response.ok){
            const target = await response.json();
            return target;
        }else{
            const error = await response.text();
            return new TypeError(error);
        }
    }catch(error){
        throw error;
    }
}

async function add_new_film(film){
    try{
        const response = await fetch("http://localhost:3001/api/v1/films", 
        {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(film),
            headers:{
                'Content-Type':'application/json'
            }
        });
        if(response.ok){
            return true;
        }else{
            const error = await response.text();
            return new TypeError(error);
        }
    }catch(error){
        throw error;
    }
}

async function update_film(film, id){
    try{
        const response = await fetch("http://localhost:3001/api/v1/films/update/" + id, 
        {
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(film),
            headers:{
                'Content-Type':'application/json'
            }
        });
        if(response.ok){
            return true;
        }else{
            const error = await response.text();
            return new TypeError(error);
        }
    }catch(error){
        throw error;
    }
}

async function delete_film(id){
    try{
        const response = await fetch("http://localhost:3001/api/v1/films/" + id, 
        {
            credentials: 'include',
            method: 'DELETE'
        });
        if(response.ok){
            return true;
        }else{
            const error = await response.text();
            return new TypeError(error);
        }
    }catch(error){
        throw error;
    }
}

async function toggle_favorite(id){
    try{
        const response = await fetch("http://localhost:3001/api/v1/films/toggle/" + id, 
        {
            credentials: 'include',
            method: 'PUT'
        });
        if(response.ok){
            return true;
        }else{
            const error = await response.text();
            return new TypeError(error);
        }
    }catch(error){
        throw error;
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

async function get_user_info(){
    const response = await fetch('http://localhost:3001/api/v1/sessions/current', {
      credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    } else {
      throw user;
    }
  };
  
  const log_user_out = async() => {
    const response = await fetch('http://localhost:3001/api/v1/sessions/current', {
        credentials: 'include',
        method: 'DELETE',
    });
    if (response.ok)
      return null;
  }
  

module.exports = { fetch_filtered_films, fetch_initial_films, fetch_film_by_id, add_new_film, update_film, delete_film, toggle_favorite, send_credentials, get_user_info, log_user_out };