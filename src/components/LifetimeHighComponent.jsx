import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import axiosBaseUrl from './AxiosConfig';
import { Link } from 'react-router-dom';

const LifetimeHighComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axiosBaseUrl
            .get("/report/gf/lth")
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
        <h2 className='text-center'>Lifetime High</h2>
        <p className='text-center'>The stocks that are near last 3 year low.</p>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Symbol</td>
                    <td>High Price</td>
                    <td>Highest On</td>
                    <td>Low Price</td>
                    <td>% From High Price</td>
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
                        <td>{it.highest}</td>
                        <td>{it.highestOn}</td>
                        <td>{it.lowPrice}</td>
                        <td>{it.downPer}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    </div>
  )
}

export default LifetimeHighComponent
