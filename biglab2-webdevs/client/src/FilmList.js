import { Table } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetch_filtered_films, delete_film, toggle_favorite, update_film } from "./API";

function FilmList(props){
    
    const [filtered_films, setFiltered_films] = useState([]);

    const navigate = useNavigate();
    const {filter} = useParams();
    
    async function filter_films(){
        const new_filtered_films = await fetch_filtered_films(filter, props.logged_user);
        setFiltered_films(new_filtered_films);
    }

    useEffect(() => {
        filter_films();
        props.change_filter(filter);
    }, [filter]);
    
    return  <Table>
                <tbody>
                {
                    filtered_films.map(film => 
                    (
                        <tr key={film.id}>
                            {Boolean(film.favorite) && <td><FiEdit size={25} onClick={() => {
                                                                                        navigate(`/EditForm/${film.id}`);
                                                                                    }
                                                                            } /><BsTrash size={25} onClick={async () => {
                                                                                                            await delete_film(film.id);
                                                                                                            filter_films();
                                                                                                            props.reload_films();
                                                                            }}/><span className="red_text"> {film.title}</span></td>}
                            {Boolean(film.favorite) && <td><input type="checkbox" defaultChecked onClick={async () => {
                                                                                                            await toggle_favorite(film.id);
                                                                                                            filter_films();
                                                                                                            props.reload_films();
                                                                                                        }}/> Favorite</td>}
                            {Boolean(!film.favorite) && <td><FiEdit size={25} onClick={() => {
                                                                                        navigate(`/EditForm/${film.id}`);
                                                                                    }
                                                                            } /><BsTrash size={25} onClick={async () => {
                                                                                                                    await delete_film(film.id);
                                                                                                                    filter_films();
                                                                                                                    props.reload_films();
                                                                                                                }}/><span> {film.title}</span></td>}
                            {Boolean(!film.favorite) && <td><input type="checkbox" onClick={async () => {
                                                                                                        await toggle_favorite(film.id);
                                                                                                        filter_films();
                                                                                                        props.reload_films();
                                                                                                    }}/> Favorite</td>}
                        {
                            film.watchdate ? 
                            (
                                <td>{dayjs(film.watchdate).format('MMMM D, YYYY')}</td>                            
                            ) :
                            (<td></td>)
                        }
                            <td>{

                                    [0, 1, 2, 3, 4].map(star => star<film.rating ? 
                                        (<AiFillStar key={film.id * 5 + star} onClick={async () => {
                                            if(star+1 !== film.rating){
                                                await update_film({title:film.title, favorite:film.favorite, watchdate:film.watchdate, rating: star+1, user: props.logged_user}, film.id);
                                                filter_films();
                                                props.reload_films();
                                            }
                                        }}/>):
                                        (<AiOutlineStar key={film.id * 5 + star} onClick={async () => {
                                            if(star+1 !== film.rating){
                                                await update_film({title:film.title, favorite:film.favorite, watchdate:film.watchdate, rating: star+1, user: props.logged_user}, film.id);
                                                filter_films();
                                                props.reload_films();
                                            }
                                        }}/>)
                                    )}
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>;
}

export default FilmList;