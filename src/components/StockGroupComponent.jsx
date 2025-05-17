import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import axiosBaseUrl from './AxiosConfig';

const StockGroupComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axiosBaseUrl
            .get("/info/groups")
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
        <h2 className='text-center'>Stock Groups</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>Name</td>
                    {/* <td>Description</td> */}
                    <td>Symbols</td>
                </tr>
            </thead>
            <tbody>
                {
                data.map(group => 
                    <tr key={group.name}>
                        <td>{group.name}</td>
                        {/* <td>{group.description}</td> */}
                        <td>{group.symbols.join(', ')}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    </div>
  )
}

export default StockGroupComponent
