import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import axiosBaseUrl from './AxiosConfig';
import { Link } from 'react-router-dom';

const HighLow52WeekComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axiosBaseUrl
            .get("/report/gf/hl_52w")
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
        <h2 className='text-center'>52 Week Low</h2>
        <p className='text-center'>The stocks that are currently near 52 week low.</p>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Symbol</td>
                    <td>52W High</td>
                    <td>52W Low</td>
                    <td>Previous Close Price</td>
                    <td>% From High</td>
                    <td>% From Low</td>
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
                        <td>{it.high}</td>
                        <td>{it.low}</td>
                        <td>{it.lastPrice}</td>
                        <td>{it.fromHighPer}</td>
                        <td>{it.fromLowPer}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    </div>
  )
}

export default HighLow52WeekComponent
