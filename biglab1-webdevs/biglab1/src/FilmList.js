import { Table } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import calculate_difference from './calculate_difference';

function filtered_films(films, filter){
  
    switch(filter){
      case "All":
        return films;
      case "Favorites":
        return films.filter(film => film.favorite === true);
      case "Best_Rated":
        return films.filter(film => film.rating === 5);
      case "Seen_Last_Month":
        return films.filter(film => calculate_difference(film.date) <= 0);
      case "Unseen":
        return films.filter(film => film.date === undefined);
      default:
        if(filter[0] === "\"" && filter[String(filter).length-1] === "\"")
          return films.filter(film => String(film.title).toLowerCase().includes(String(filter).substring(1, String(filter).length-1).toLowerCase()));
        else
          return [];
    }
}

function FilmList(props){

    const navigate = useNavigate();
    const {filter} = useParams();

    return  <Table hover>
                <tbody>
                {
                    filtered_films(props.films, filter).map(film => 
                    (
                        <tr key={film.id}>
                            {film.favorite && <td><FiEdit size={25} onClick={() => {
                                                                                        props.change_selected(film);
                                                                                        navigate('/EditForm');
                                                                                    }
                                                                            } /><BsTrash size={25} onClick={() => props.delete_film(film.id)}/><span className="red_text"> {film.title}</span></td>}
                            {film.favorite && <td><input type="checkbox" defaultChecked onClick={() => props.toggle_favorite(film.id)}/> Favorite</td>}
                            
                            {!film.favorite && <td><FiEdit size={25} onClick={() => {
                                                                                        props.change_selected(film);
                                                                                        navigate('/EditForm');
                                                                                    }
                                                                            } /><BsTrash size={25} onClick={() => props.delete_film(film.id)}/><span> {film.title}</span></td>}
                            {!film.favorite && <td><input type="checkbox" onClick={() => props.toggle_favorite(film.id)}/> Favorite</td>}
                        {
                            film.date ? 
                            (
                                <td>{dayjs(film.date).format('MMMM D, YYYY')}</td>                            
                            ) :
                            (<td></td>)
                        }
                            <td>{

                                    [0, 1, 2, 3, 4].map(star => star<film.rating ? 
                                        (<AiFillStar key={film.id * 5 + star} onClick={() => props.change_rating(film.id, star+1)}/>):
                                        (<AiOutlineStar key={film.id * 5 + star} onClick={() => props.change_rating(film.id, star+1)}/>)
                                    )}
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>;
}

export default FilmList;