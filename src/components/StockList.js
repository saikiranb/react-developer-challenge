import { Container,Alert } from "react-bootstrap"

function StockList({stocksList}){
    return (
        <>
        { stocksList.length > 0 ?
        <Container>
        <table className='table mt-5'>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Open Price</th>
              <th>Close Price</th>
              <th>Date</th>
            </tr>
            {
                stocksList.map((ele,index) => 
                    <tr key={ele.symbol}>
                        <td>{ele.symbol}</td>
                        <td>{ele.open}</td>
                        <td>{ele.close}</td>
                        <td>{ele.date}</td>
                  </tr>
                  )
            }
            
          </thead>
        </table>
        </Container> 
        :  
        <Container>
            <Alert key='warning' variant='warning'>No stocks are tracked.</Alert>
        </Container>}
        </>
       
    )
}
export default StockList