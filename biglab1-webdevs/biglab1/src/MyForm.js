import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import './MyForm.css';
import dayjs from "dayjs";
import { useState } from "react";
import { Film } from "./film_library"
import { useNavigate } from "react-router-dom";

function MyForm(props){

    const navigate = useNavigate();

    const [id, setId] = useState(props.form_mode[1] ? Number(props.selected_film.id) : -1);
    const [title, setTitle] = useState(props.form_mode[1] ? props.selected_film.title : undefined);
    const [favorite, setFavorite] = useState(props.form_mode[1] ? String(props.selected_film.favorite) : undefined);
    const [date, setDate] = useState(props.form_mode[1] ? props.selected_film.date : undefined);
    const [rating, setRating] = useState(props.form_mode[1] ? Number(props.selected_film.rating) : undefined);

    function string_to_boolean(string){
        switch(string){
            case "true":
                return true;
            case "false":
                return false;
            default:
                return "";
        }
    }

    function is_undefined_or_NaN(number){
        if(number >= 0 && number <=5)
            return false;
        return true;
    }

    return  <Form onSubmit={(event) => {
                                            event.preventDefault();
                                            props.modify_list(new Film(     Number(id), 
                                                                            title,
                                                                            string_to_boolean(favorite), 
                                                                            date,
                                                                            is_undefined_or_NaN(rating) ? undefined : Number(rating)),
                                                                            props.form_mode);
                                            props.active_filter === undefined ? navigate('/') : navigate(`/Filters/${props.active_filter}`);
                                        }
                            }>
                <Row>
                    <Col xs={1}>
                        {props.form_mode[0] && <Form.Control type="number" required placeholder="id" min={0} onChange={event => setId(event.target.value)}/>}
                        {props.form_mode[1] && <Form.Control type="number" required defaultValue={id} min={0} onChange={event => setId(event.target.value)}/>}
                    </Col>
                    <Col xs={4}>
                        {props.form_mode[0] && <Form.Control type="text" required placeholder="title" onChange={event => setTitle(event.target.value)}/>}
                        {props.form_mode[1] && <Form.Control type="text" required defaultValue={title} onChange={event => setTitle(event.target.value)}/>}
                    </Col>
                    <Col xs={1}>
                        {props.form_mode[0] && <Form.Control type="text" placeholder="favorite" pattern="true|false" title="Must be either 'true' or 'false'" onChange={event => setFavorite(event.target.value)}/>}
                        {props.form_mode[1] && favorite !== undefined && <Form.Control type="text" defaultValue={String(favorite)} pattern="true|false" title="Must be either 'true' or 'false'" onChange={event => setFavorite(event.target.value)}/>}
                        {props.form_mode[1] && favorite === undefined && <Form.Control type="text" pattern="true|false" title="Must be either 'true' or 'false'" onChange={event => setFavorite(event.target.value)}/>}
                    </Col>
                    <Col xs={3}>
                        {props.form_mode[0] && <Form.Control type="date" placeholder="watch date" onChange={event => setDate(dayjs(event.target.value))}/>}
                        {props.form_mode[1] && date !== undefined && <Form.Control type="date" defaultValue={dayjs(date).format('YYYY-MM-DD')} onChange={event => setDate(event.target.value)}/>}
                        {props.form_mode[1] && date === undefined && <Form.Control type="date" onChange={event => setDate(event.target.value)}/>}
                    </Col>
                    <Col xs={1}>
                        {props.form_mode[0] && <Form.Control type="number" placeholder="rating" min={0} max={5} onChange={event => setRating(event.target.value)}/>}
                        {props.form_mode[1] && !is_undefined_or_NaN(rating) && <Form.Control type="number" defaultValue={rating} min={0} max={5} onChange={event => setRating(event.target.value)}/>}
                        {props.form_mode[1] && is_undefined_or_NaN(rating) && <Form.Control type="number" min={0} max={5} onChange={event => setRating(event.target.value)}/>}
                    </Col>
                    <Col xs={1}>
                        {props.form_mode[0] && <Form.Control type="submit" className="green_background" value="Add"/>}
                        {props.form_mode[1] && <Form.Control type="submit" className="green_background" value="Save"/>}
                    </Col>
                    <Col xs={1}>
                        <Form.Control type="button" onClick={() => {
                                                                        navigate(`/Filters/${props.active_filter}`)
                                                                    }} id="red_background" value="Close" />
                    </Col>
                </Row>
            </Form>;
}

export default MyForm;