import React from 'react'
import { useParams } from 'react-router-dom'
import BacktestReportComponent from './BacktestReportComponent'
import BacktestPositionsComponent from './BacktestPositionsComponent'

const SymbolDetailsComponent = () => {
  const {symbol} = useParams()
  return (
    <div>
        <BacktestReportComponent symbol={symbol} />
        <BacktestPositionsComponent symbol={symbol} />
    </div>
  )
}

export default SymbolDetailsComponent