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
                <NavigationBar logout={props.logout}/>
              </Col>
            </Row>
            <p></p>
            <Row>
              <Col xs={3} md={2} xl={1} id="filter_backgound">
                <p></p>
                <Filters />
              </Col>
              <Col xs={9} md={10} xl={11}>
                {filter !== undefined && <ActiveFilter filter={filter}/>}
                {filter === undefined && <ActiveFilter filter={"None"} />}
                {filter !== undefined && <FilmList reload_films={props.reload_films} change_filter={props.change_filter} logged_user={props.logged_user}/>}
                <Row>
                  <Col xs={10}>
                  </Col>
                  <Col xs={2}>
                    <AddButton />
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
          );
  }

  export default Home;