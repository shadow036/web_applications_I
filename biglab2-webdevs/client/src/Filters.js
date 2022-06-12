import { Button } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function Filters(props){

    const navigate = useNavigate();
    const {filter} = useParams();

    return <ButtonGroup vertical>
                {
                    filter==="All" ? 
                        <Button variant="primary" onClick={() => 
                                                                {
                                                                    navigate('/Filters/All');
                                                                }
                                                            }>All</Button> :
                        <Button variant="outline-dark" onClick={() => 
                                                                    {
                                                                        navigate('/Filters/All');
                                                                    }
                                                            }>All</Button>
                }
                {
                    filter==="Favorites" ? 
                        <Button variant="primary" onClick={() => 
                                                                {
                                                                    navigate('/Filters/Favorites');
                                                                }
                                                            }>Favorites</Button> :
                        <Button variant="outline-dark" onClick={() => 
                                                                        {
                                                                            navigate('/Filters/Favorites');
                                                                        }
                                                                    }>Favorites</Button>
                }
                {
                    filter==="Best_Rated" ? 
                        <Button variant="primary" onClick={() => 
                                                                {
                                                                    navigate('/Filters/Best_Rated');
                                                                }}>Best Rated</Button> :
                        <Button variant="outline-dark" onClick={() => 
                                                                    {
                                                                        navigate('/Filters/Best_Rated')
                                                                    }
                                                                }>Best Rated</Button>
                }
                {
                    filter==="Seen_Last_Month" ? 
                        <Button variant="primary" onClick={() => 
                                                                {
                                                                    navigate('/Filters/Seen_Last_Month');
                                                                }
                                                            }>Seen Last Month</Button> :
                        <Button variant="outline-dark" onClick={() => 
                                                                    {
                                                                        navigate('/Filters/Seen_Last_Month');
                                                                    }
                                                                }>Seen Last Month</Button>
                }
                {
                    filter==="Unseen" ? 
                        <Button variant="primary" onClick={() => 
                                                                {
                                                                    navigate('/Filters/Unseen')
                                                                }
                                                            }>Unseen</Button> :
                        <Button variant="outline-dark" onClick={() => 
                                                                    {
                                                                        navigate('/Filters/Unseen');
                                                                    }
                                                                }>Unseen</Button>
                }
            </ButtonGroup>;
}

export default Filters;