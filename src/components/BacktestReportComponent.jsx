import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import axiosBaseUrl from './AxiosConfig';
import DateSlider from './DateSlider';

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

  const handleDateChange = (dates) => {
    console.log("Selected dates:", dates);
    // Process the selected dates (which are now JavaScript Date objects)
  };

  return (
    <div className='container'>
        <h2 className='text-center'>Strategy Report: {symbol}</h2>
        {data.strategyReportList.length === 0 ?
        <div className='text-center'>No data available</div> :
        <div className="row">
          <div> 
            <DateSlider
                minDate={data.metadata.fromDate}
                maxDate={data.metadata.toDate}
                fromDate={data.metadata.fromDate}
                toDate={data.metadata.toDate}
                onDateChange={handleDateChange}
            />
         </div>
          <div className='col-md-6 text-left'><b>From Date:</b>{data.metadata.fromDate} <b>To Date:</b> {data.metadata.toDate}</div>
          <div className='col-md-6 text-right'>From Price: {data.metadata.fromDateClosePrice} To Price: {data.metadata.toDateClosePrice}</div>
        </div>
        }
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
                data.strategyReportList.map((it, i) => 
                    <>
                    <tr key={i + '-Fresh'}>
                        <td rowSpan="2">{it.strategyName}</td>
                        <td>Fresh</td>
                        <td style={backgroundColor(it.freshPositionCount + 8)}>{it.freshPositionCount}</td>
                        <td>{it.freshPositionGain}</td>
                        <td>{it.freshPositionDays}</td>
                        <td style={backgroundColor(it.freshPositionCagr)}>{it.freshPositionCagr}</td>
                        <td>{it.freshOpenPosUnrealizedReturn === 0.0 ? '-' : it.freshOpenPosUnrealizedReturn + ' From ' + it.freshOpenPosDate}</td>
                    </tr>
                    <tr key={i + '-Avg'}>
                        <td>Avg</td>
                        <td style={backgroundColor(it.avgPositionCount + 8)}>{it.avgPositionCount}</td>
                        <td>{it.avgPositionGain}</td>
                        <td>{it.avgPositionDays}</td>
                        <td style={backgroundColor(it.avgPositionCagr)}>{it.avgPositionCagr}</td>
                        <td>{it.avgOpenPosUnrealizedReturn === 0.0 ? '-' : it.avgOpenPosUnrealizedReturn + ' From ' + it.avgOpenPosDate}</td>
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
