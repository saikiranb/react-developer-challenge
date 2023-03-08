import Container from 'react-bootstrap/Container';
import AddStocks from '../components/AddStocks';
import Header from '../components/Header';

function Home(){
    return(
        <>
        <Container fluid>
            
            <Header />
            <br/>
            <AddStocks />
        </Container>
        </>
    )
}
export default Home