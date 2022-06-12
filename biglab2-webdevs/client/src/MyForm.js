import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import './MyForm.css';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetch_film_by_id, add_new_film, update_film } from "./API";

function MyForm(props){

    const navigate = useNavigate();
    const {film_id} = useParams();
    
    const [form_mode, setForm_mode] = useState(film_id === undefined ? [true, false] : [false, true]);
    const [id, setId] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    const [favorite, setFavorite] = useState(undefined);
    const [date, setDate] = useState(undefined);
    const [rating, setRating] = useState(undefined);

    useEffect(() => {
        async function get_film_by_id(){
            const film = await fetch_film_by_id(film_id);
            setId(film[0].id);
            setTitle(film[0].title);
            setFavorite(Boolean(film[0].favorite));
            setDate(film[0].watchdate);
            setRating(film[0].rating);
        }
        if(film_id !== undefined)
            get_film_by_id();
    }, []);

    function is_undefined_or_NaN(number){
        if(number >= 0 && number <=5)
            return false;
        return true;
    }

    function string_to_number(string){
        switch(string){
            case "true":
            case true:
                return 1;
            default:
                return 0;
        }
    }

    return  <Form onSubmit={async (event) => {
                                            event.preventDefault();
                                            film_id === undefined ? 
                                                await add_new_film({title:title, favorite:string_to_number(favorite), watchdate:date, rating: is_undefined_or_NaN(rating) ? undefined : Number(rating), user: props.logged_user}) :
                                                await update_film({title:title, favorite:string_to_number(favorite), watchdate:date, rating: is_undefined_or_NaN(rating) ? undefined : Number(rating), user: props.logged_user}, Number(id));
                                            props.reload_films();
                                            props.active_filter === undefined ? navigate('/') : navigate(`/Filters/${props.active_filter}`);
                                        }
                            }>
                <Row>
                    <Col xs={1}>
                        {/*form_mode[0] && <Form.Control type="number" required disabled placeholder="id" min={0} onChange={event => setId(event.target.value)}/>*/}
                        {form_mode[1] && <Form.Control type="number" required disabled defaultValue={id} onChange={event => setId(event.target.value)}/>}
                    </Col>
                    <Col xs={4}>
                        {form_mode[0] && <Form.Control type="text" required placeholder="title" onChange={event => setTitle(event.target.value)}/>}
                        {form_mode[1] && <Form.Control type="text" required defaultValue={title} onChange={event => setTitle(event.target.value)}/>}
                    </Col>
                    <Col xs={1}>
                        {form_mode[0] && <Form.Control type="text" placeholder="favorite" pattern="true|false" title="Must be either 'true' or 'false'" onChange={event => setFavorite(event.target.value)}/>}
                        {form_mode[1] && favorite !== undefined && <Form.Control type="text" defaultValue={String(favorite)} pattern="true|false" title="Must be either 'true' or 'false'" onChange={event => setFavorite(event.target.value)}/>}
                        {form_mode[1] && favorite === undefined && <Form.Control type="text" pattern="true|false" title="Must be either 'true' or 'false'" onChange={event => setFavorite(event.target.value)}/>}
                    </Col>
                    <Col xs={3}>
                        {form_mode[0] && <Form.Control type="date" placeholder="watch date" onChange={event => setDate(dayjs(event.target.value))}/>}
                        {form_mode[1] && date !== undefined && <Form.Control type="date" defaultValue={dayjs(date).format('YYYY-MM-DD')} onChange={event => setDate(event.target.value)}/>}
                        {form_mode[1] && date === undefined && <Form.Control type="date" onChange={event => setDate(event.target.value)}/>}
                    </Col>
                    <Col xs={1}>
                        {form_mode[0] && <Form.Control type="number" placeholder="rating" min={0} max={5} onChange={event => setRating(event.target.value)}/>}
                        {form_mode[1] && !is_undefined_or_NaN(rating) && <Form.Control type="number" defaultValue={rating} min={0} max={5} onChange={event => setRating(event.target.value)}/>}
                        {form_mode[1] && is_undefined_or_NaN(rating) && <Form.Control type="number" min={0} max={5} onChange={event => setRating(event.target.value)}/>}
                    </Col>
                    <Col xs={1}>
                        {form_mode[0] && <Form.Control type="submit" className="green_background" value="Add"/>}
                        {form_mode[1] && <Form.Control type="submit" className="green_background" value="Save"/>}
                    </Col>
                    <Col xs={1}>
                        <Form.Control type="button" onClick={() => {
                                                                    if(props.active_filter === undefined)
                                                                        navigate('/');
                                                                    else
                                                                        navigate(`/Filters/${props.active_filter}`);
                                                                    }} id="red_background" value="Close" />
                    </Col>
                </Row>
            </Form>;
}

export default MyForm;