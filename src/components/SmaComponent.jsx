import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import axiosBaseUrl from './AxiosConfig';
import { Link } from 'react-router-dom';

const SmaComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axiosBaseUrl
            .get("/report/gf/sma")
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
   
  return (
    <div className='container'>
        <h2 className='text-center'>Simple Moving Average</h2>
        <p className='text-center'>The stocks that are currently satisfying simple moving average buying criteria.</p>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Symbol</td>
                    <td>SMA 200</td>
                    <td>SMA 50</td>
                    <td>SMA 20</td>
                    <td>Previous Close Price</td>
                    <td>% From SMA 200 Price</td>
                </tr>
            </thead>
            <tbody>
                {
                data.map((it, i) => 
                    <tr key={it.id}>
                        <td>{i + 1}</td>
                        <td><Link to={`/symbols/${it.symbol}?exchange=NSE`}>
                                {it.symbol}
                            </Link></td>
                        <td>{it.sma200}</td>
                        <td>{it.sma50}</td>
                        <td>{it.sma20}</td>
                        <td>{it.lastPrice}</td>
                        <td>{it.downPer}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    </div>
  )
}

export default SmaComponent
