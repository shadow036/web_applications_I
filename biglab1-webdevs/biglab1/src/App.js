import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MyForm from './MyForm';
import load_library from './load_library';
import { useState } from 'react';
import { Film } from './film_library';
import Home from './Home';

function App() {
  
  const [films, setFilms] = useState(load_library());
  const [active_filter, setActive_filter] = useState(undefined);
  const [selected_film, setSelected_film] = useState(undefined);

  function change_filter(new_filter){
    setActive_filter(new_filter);
  }

  function toggle_favorite(film_id){
    setFilms(films => films.map(film => {
      if(film.id === film_id)
        return new Film(film.id, film.title, !film.favorite, film.date, film.rating);
      else
        return film;
    }));
  }

  function delete_film(film_id){
    setFilms(films => films.filter(film => film.id !== film_id));
  }

  function change_selected(new_selected_film){
    setSelected_film(new_selected_film);
  }

  function modify_list(new_film, form_mode){
    form_mode[0] ? setFilms(films => [...films, new_film]) : setFilms(films => films.map(film => (film === selected_film ? new_film : film)));
  }

  function change_rating(film_id, new_rating){
    setFilms(films => films.map(film => (film.id === film_id ? new Film(film.id, film.title, film.favorite, film.date, new_rating) : film)));
  }

  return(
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home change_filter={change_filter} />} />
              <Route path='/AddForm' element={<MyForm form_mode={[true, false]} modify_list={modify_list} active_filter={active_filter}/>} />
              <Route path='/EditForm' element={<MyForm form_mode={[false, true]} selected_film={selected_film} modify_list={modify_list} active_filter={active_filter}/>} />
              <Route path='/Filters/:filter' element={<Home change_filter={change_filter} films={films} toggle_favorite={toggle_favorite} delete_film={delete_film} change_selected={change_selected} change_rating={change_rating}/>} />
              <Route path='*' element={<h1>Error: this page doesn't exist</h1>} />
            </Routes>
          </BrowserRouter>
        );

}

export default App;