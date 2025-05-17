import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import axiosBaseUrl from './AxiosConfig';

const SymbolReportComponent = ({symbol, exchange}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      // Make GET request to fetch data
      axiosBaseUrl
          .get("/stocks/" + symbol + "/backtest/report?exchange=" + exchange)
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
        <h2 className='text-center'>Strategy Report: {symbol}</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>Startegy Name</td>
                    <td>Position Type</td>
                    <td>Count</td>
                    <td>Gain</td>
                    <td>Days</td>
                    <td>CAGR</td>
                    <td>Open Pos Abs Return</td>
                </tr>
            </thead>
            <tbody>
                {
                data.map(it => 
                    <>
                    <tr key={it.strategyName + '-Fresh'}>
                        <td rowSpan="2">{it.strategyName}</td>
                        <td>Fresh</td>
                        <td style={backgroundColor(it.freshPositionCount + 8)}>{it.freshPositionCount}</td>
                        <td>{it.freshPositionGain}</td>
                        <td>{it.freshPositionDays}</td>
                        <td style={backgroundColor(it.freshPositionCagr)}>{it.freshPositionCagr}</td>
                        <td>{it.freshOpenPosUnrealizedReturn === 0.0 ? '-' : it.freshOpenPosUnrealizedReturn}</td>
                    </tr>
                    <tr key={it.strategyName + '-Avg'}>
                        <td>Avg</td>
                        <td style={backgroundColor(it.avgPositionCount + 8)}>{it.avgPositionCount}</td>
                        <td>{it.avgPositionGain}</td>
                        <td>{it.avgPositionDays}</td>
                        <td style={backgroundColor(it.avgPositionCagr)}>{it.avgPositionCagr}</td>
                        <td>{it.avgOpenPosUnrealizedReturn === 0.0 ? '-' : it.avgOpenPosUnrealizedReturn}</td>
                    </tr>
                    </>
                    )
                }
            </tbody>
        </Table>
    </div>
  )
}

export default SymbolReportComponent
