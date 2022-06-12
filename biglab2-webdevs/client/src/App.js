import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Row, Alert } from 'react-bootstrap';
import MyForm from './MyForm';
import { useEffect, useState } from 'react';
import Home from './Home';
import LoginForm from './LoginForm';
import { fetch_initial_films, send_credentials, log_user_out, get_user_info} from "./API";

function App() {

  const [films, setFilms] = useState([]);
  const [active_filter, setActive_filter] = useState(undefined);
  const [logged_in, setLogged_in] = useState(false);
  const [message, setMessage] = useState('');
  const [logged_user, setLogged_user] = useState(undefined);

  async function load_films(){
    const films = await fetch_initial_films();
    setFilms(films);
  };

  useEffect(() => {
    const checkAuth = async () => {
      await get_user_info();
      setLogged_in(true);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    load_films();
  }, [logged_in]);


  async function login(credentials){
    try {
      const user = await send_credentials(credentials);
      setLogged_user(user.id);
      setLogged_in(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
    }catch(err) {
      console.log(err);
      //setMessage({msg: err, type: 'danger'});
      setMessage({msg: "Incorrect credentials", type: 'danger'});
    }
  }

  async function logout(){
    await log_user_out();
    setLogged_in(false);
    setFilms([]);
    setMessage('');
    setLogged_user(undefined);
  }

  function change_filter(new_filter){
    setActive_filter(new_filter);
  }

  return(
          <>
            {message && <Row><Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert></Row> }
              <BrowserRouter>
                <Routes>
                    <Route path='/Login' element={logged_in ? <Navigate replace to='/' /> : <LoginForm login={login}/>} />
                    <Route path='/' element={logged_in ? <Home reload_films={load_films} change_filter={change_filter} logout={logout} logged_user={logged_user}/> : <Navigate replace to='/Login' />} />
                    <Route path='/AddForm' element={logged_in ? <MyForm reload_films={load_films} active_filter={active_filter} logged_user={logged_user}/> : <Navigate replace to='/Login' />} />
                    <Route path='/EditForm/:film_id' element={logged_in ? <MyForm reload_films={load_films} active_filter={active_filter} logged_user={logged_user}/> : <Navigate replace to='/Login' />} />
                    <Route path='/Filters/:filter' element={logged_in ? <Home reload_films={load_films} change_filter={change_filter} logout={logout} logged_user={logged_user}/> : <Navigate replace to='/Login' />} />
                    <Route path='*' element={<h1>Error: this page doesn't exist</h1>} />
                </Routes>
              </BrowserRouter>
          </>
        );
}

export default App;