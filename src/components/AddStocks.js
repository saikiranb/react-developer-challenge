import React, { useEffect, useState } from 'react';
import { Form,Button, Container } from 'react-bootstrap';
import StockList from './StockList';
import Alert from 'react-bootstrap/Alert';

const AddStocks = () => {
const [error, setError] = useState('')
const [stocks, setStocksList] = useState(() => {
    const storedStocks = localStorage.getItem('stockslist');
    return storedStocks ? JSON.parse(storedStocks) : [];
    });

const [stocksData, setStocksData] = useState(() => {
    const storedStocksData = localStorage.getItem('stocksdata');
    return storedStocksData ? JSON.parse(storedStocksData) : [];
    });
    
const [ticker, setTicker] = useState('');
  
//Check if ticker symbol is valid
async function checkTicker(tickerSym){
    if(!!tickerSym){
        const res = await fetch(`${process.env.REACT_APP_VANTAGE_API_ENDPOINT}/query?function=SYMBOL_SEARCH&keywords=${tickerSym}&apikey=${process.env.REACT_APP_VANTAGE_API_KEY}`)
        const jsonData = await res.json()
        const bestMatch = jsonData?.bestMatches?.filter((ele)=>{
            return ele['9. matchScore'] === '1.0000'
        })
        if(bestMatch?.length > 0){
            return true
        }
        return false
    }   
}
const handleChange = (e) => {
    e.preventDefault()
    setTicker(e.target.value.toUpperCase())
    setError('')
}
const handleOnSumbit = (e) => {
    e.preventDefault()
    checkTicker(e.target[0].value).then((res)=>{
        if(res){
            if(!ticker.trim()) return
            if(!stocks.includes(ticker) ){

                const data = 
                     fetch(`${process.env.REACT_APP_VANTAGE_API_ENDPOINT}/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${process.env.REACT_APP_VANTAGE_API_KEY}`)
                     .then(res=>res.json())
                     .then(data=>(
                        {      
                            "symbol": data?.['Meta Data']?.['2. Symbol'],
                            "date": data?.['Meta Data']?.['3. Last Refreshed'],
                            "open": data?.['Time Series (Daily)']?.[data['Meta Data']['3. Last Refreshed']]?.['1. open'],
                            "close": data?.['Time Series (Daily)']?.[data['Meta Data']['3. Last Refreshed']]?.['4. close'],
                        }    
                    )
                    )
                    .catch(error=>console.log(error))
                
                
                data.then((res)=> {
                    if(!!res.symbol){
                        setStocksData([...stocksData,res])
                        setStocksList([...stocks,ticker])
                    }else{
                        setError('Vantage API call frequency is 5 calls per minute.') 
                    }
                    
                })
                .catch(error=>console.log(error))


                
                setTicker('')
            }else{
                setError('This stock is already in list.')
            }
        }else{
            setError('This stock does not exist.')
        }
    })    
}

//Store the data in localstorage
useEffect(() => {
    localStorage.setItem('stockslist', JSON.stringify(stocks));
}, [stocks]);
useEffect(() => {
    localStorage.setItem('stocksdata', JSON.stringify(stocksData));
}, [stocksData]);
  return (
    <>
    <Container>
    <Form onSubmit={handleOnSumbit}>
      <Form.Group className="mb-3" controlId="stockTicker">
        <Form.Label>Stock Ticker</Form.Label>
        <Form.Control type="text" placeholder="Enter stock ticker" value = {ticker} onChange ={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Stock
      </Button>
      <br/><br/>
      {
        error?  <Alert key='danger' variant='danger'>
        {error}
      </Alert> : ''
      }
     
    </Form>
    <StockList stocksList={stocksData} />
    </Container>
    </>
  );
}

export default AddStocks;
