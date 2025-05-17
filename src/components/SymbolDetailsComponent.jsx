import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import BacktestReportComponent from './BacktestReportComponent'
import BacktestPositionsComponent from './BacktestPositionsComponent'

const SymbolDetailsComponent = () => {
  const {symbol} = useParams()
  let [searchParams, setSearchParams] = useSearchParams()
  const exchange = searchParams.get("exchange")
  
  return (
    <div>
        <BacktestReportComponent symbol={symbol} exchange={exchange}/>
        <BacktestPositionsComponent symbol={symbol} exchange={exchange}/>
    </div>
  )
}

export default SymbolDetailsComponent