import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import axiosBaseUrl from './AxiosConfig';
import { Link } from 'react-router-dom';

const SymbolInfoComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axiosBaseUrl
            .get("/stocks")
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
        <h2 className='text-center'>Symbol with labels</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>Symbol</td>
                    <td>Labels</td>
                </tr>
            </thead>
            <tbody>
                {
                data.map(it => 
                    <tr key={it.id}>
                        <td><Link to={`/symbols/${it.symbol}`}>
                                {it.symbol}
                            </Link></td>
                        <td>{it.labels.join(', ')}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    </div>
  )
}

export default SymbolInfoComponent
