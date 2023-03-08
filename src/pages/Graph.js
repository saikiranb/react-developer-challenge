import Container from 'react-bootstrap/Container';
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import StockGraph from '../components/StockGraph'
function Graph(){
    const [stocks, setStocks] = useState([])
    const [selected, setSelected] = useState('')
    const stockslist  = localStorage.getItem('stockslist')
    useEffect(()=>{
        setStocks(JSON.parse(stockslist))
    },[])
    const handleOnSelect = (e) =>{
        setSelected(e.target.value)
    }
    return(
        <>
        <Container fluid>
            <Header />
           
            <Container>
                <br/>
            
            <select className="form-select  w-50 mb-3"  onChange={handleOnSelect}>
                <option value="">Select a stock to see graph</option>
                {
                    stocks.map((ele)=>{
                        return(<option value={ele}>{ele}</option>)
                        
                    })
                }
            </select>       
            </Container>
            <StockGraph ticker={selected}/>
        </Container>
        </>
    )
}
export default Graph