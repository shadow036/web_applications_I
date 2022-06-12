import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import NavigationBar from './NavigationBar';
import Filters from './Filters';
import ActiveFilter from './ActiveFilter';
import FilmList from './FilmList';
import AddButton from './AddButton';

function Home(props){

    const {filter} = useParams();
    
    return( 
          <>
            <Row>
              <Col>
                <NavigationBar change_filter={props.change_filter}/>
              </Col>
            </Row>
            <p></p>
            <Row>
              <Col xs={3} md={2} xl={1} id="filter_backgound">
                <p></p>
                <Filters change_filter={props.change_filter} />
              </Col>
              <Col xs={9} md={10} xl={11}>
                {filter !== undefined && <ActiveFilter filter={filter}/>}
                {filter === undefined && <ActiveFilter filter={"None"} />}
                {filter !== undefined && <FilmList films={props.films} toggle_favorite={props.toggle_favorite} delete_film={props.delete_film} change_selected={props.change_selected} change_rating={props.change_rating}/>}
                <Row>
                  <Col xs={11}>
                  </Col>
                  <Col xs={1}>
                    <AddButton />
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
          );
  }

  export default Home;