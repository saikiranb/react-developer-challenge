import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Outlet, Link } from "react-router-dom";

function Header(){
    return(
        <>
       <Container fluid>
            <Navbar expand="lg" variant="light" bg='light'>
                <Container>
                    <Navbar.Brand>Tilli Stock Ticker</Navbar.Brand>
                    <Nav className="right">
                    <Nav.Link><Link to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/graph">Graph</Link></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </Container>
        <Outlet />

        </>
    )
}
export default Header