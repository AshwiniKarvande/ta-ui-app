import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import axiosBaseUrl from './AxiosConfig';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const BacktestPositionsComponent = ({symbol, exchange}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      // Make GET request to fetch data
      axiosBaseUrl
          .get("/stocks/" + symbol + "/backtest/positions?exchange=" + exchange)
          .then((response) => {
              setData(response.data);
              setLoading(false);
          })
          .catch((err) => {
              setError(err.message);
              setLoading(false);
          });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const backgroundColor = (cagr) => {
    if (cagr > 15) {
        return { backgroundColor: 'green', color: 'white' };
    } else if (cagr > 12) {
        return { backgroundColor: 'yellow' };
    } else {
        return { backgroundColor: 'red', color: 'white' };
    }
  }

  return (
    <div className='container'>
        <h2 className='text-center'>Position Details: {symbol}</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>Startegy Name</td>
                    <td>Buy Date</td>
                    <td>Buy Price</td>
                    <td>Sell Date</td>
                    <td>Sell Price</td>
                    <td>Trading Days</td>
                    <td>Total Days</td>
                    <td>Gain Abs</td>
                    <td>Gain %</td>
                    <td>Gain CAGR</td>
                </tr>
            </thead>
            <tbody>
                {
                data.map(it => 
                    <tr key={it.strategyName + it.buyPrice + it.sellPrice}>
                        <td>{it.strategyName}</td>
                        <td>{it.buyDate}</td>
                        <td>{it.buyPrice}</td>
                        <td>{it.sellPrice}</td>
                        <td>{it.sellDate}</td>
                        <td>{it.tradingDays}</td>
                        <td>{it.totalDays}</td>
                        <td>{it.gain}</td>
                        <td>{it.gainPercent}</td>
                        <td style={backgroundColor(it.gainCagr)}>{it.gainCagr}</td>
                    </tr>
                    )
                }
            </tbody>
        </Table>
    </div>
  )
}

export default BacktestPositionsComponent
