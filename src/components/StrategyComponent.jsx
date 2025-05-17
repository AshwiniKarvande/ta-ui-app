import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import axiosBaseUrl from './AxiosConfig';

const StrategyComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axiosBaseUrl
            .get("/info/strategies")
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
        <h2 className='text-center'>Technical Strategies</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Applcable Groups</td>
                </tr>
            </thead>
            <tbody>
                {
                data.map(it => 
                    <tr key={it.name}>
                        <td>{it.name}</td>
                        <td>{it.description}</td>
                        <td>{it.stockGroups.map(gr => gr.name).join(', ')}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    </div>
  )
}

export default StrategyComponent
