import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
function StockGraph({ticker}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
        if(ticker){
            const response = await fetch(
                `${process.env.REACT_APP_VANTAGE_API_ENDPOINT}/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${process.env.REACT_APP_VANTAGE_API_KEY}`
            );
            const data = await response.json()
            const last30DaysData = Object.entries(data['Time Series (Daily)'])
                .slice(0, 30)
                .map((entry) => {
                return {
                    date: entry[0],
                    close: entry[1]['4. close'],
                };
                });
            setData(last30DaysData);
        }
    }
    fetchData();
  }, [ticker]);
  return (
    
    <Container>
        
        {data ? <>
        <br />
     <h5>Last 30 days graph of close prices of {ticker}</h5>   <br />
     <LineChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 15,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="10 10" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="close"
        stroke="#8884d8"
        activeDot={{ r: 5 }}
      />
      
    </LineChart></>
    : <></>}
    </Container>
  );
}

export default StockGraph;
